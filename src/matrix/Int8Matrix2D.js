/* jshint esnext:true */

import _transpose from "./utils/transpose";
import _convolve from "./utils/convolve";
import _extract from "./utils/extract";
import _dot from "./utils/dot";
import _rotate90 from "./utils/rotate90";
import _rotate270 from "./utils/rotate270";

/**
 * This class represents a 2D matrix of 8-bit integers.
 */
class Int8Matrix2D{

    /**
     * Construct a new matrix.
     * @param  {Integer} width
     * @param  {Integer} height
     * @param  {TypedArray} [data] Initial data to put in the matrix. Number of
     * bytes must be the same as the number of cells in the matrix.
     */
    constructor(width, height, data){
        this._width = width;
        this._height = height;
        this._data = data || new Int8Array(this._width * this._height);
    }

    /**
     * Create a new instance of Int8Matrix2D which is identical to the current
     * one. Data is duplicated.
     * @return {Int8Matrix2D}
     */
    duplicate(){
        return new Int8Matrix2D(
            this._width,
            this._height,
            new Int8Array(this._data)
        );
    }

    /**
     * Replace the contents of this matrix with another matrix.
     * Data from the other matrix is duplicated.
     * @param  {Int8Matrix2D} other The other matrix to copy.
     * @return {Int8Matrix2D} The current matrix.
     */
    replace(other){
        this._data = new Int8Array(other._data);
        this._width = other.getWidth();
        this._height = other.getHeight();
        return this;
    }

    /**
     * Check for equality with another matrix.
     * @param  {Int8Matrix2D} other The other matrix to compare with.
     * @return {Boolean} True is equal, false otherwise.
     */
    equals(other){
        if (other.getWidth() !== this.getWidth()) return false;
        if (other.getHeight() !== this.getHeight()) return false;
        for (let x = 0 ; x < this.getWidth() ; x++) {
            for (let y = 0 ; y < this.getHeight() ; y++) {
                if (this.get(x, y) !== other.get(x, y)) return false;
            }
        }
        return true;
    }

    /**
     * Transpose the current matrix.
     * @return {Int8Matrix2D} The current matrix.
     */
    transpose(){
        const n = _transpose(this);
        return this.replace(n);
    }

    /**
     * Get the value of a cell in the matrix.
     * @param  {Integer} x
     * @param  {Integer} y
     * @return {Integer}
     */
    get(x, y){
        const width = this.getWidth();
        const height = this.getHeight();
        if (x < 0 || x >= width || y < 0 || y >= height)
            throw Error("Coordinates exceed matrix dimensions");
        return this._data[toOffset(width, x, y)];
    }

    /**
     * Set the value of a cell in the matrix.
     * @param  {Integer} x
     * @param  {Integer} y
     * @param  {Integer} v The value to set in the cell.
     * @return {Int8Matrix2D} The current matrix.
     */
    set(x, y, v){
        const width = this.getWidth();
        const height = this.getHeight();
        if (x < 0 || x >= width || y < 0 || y >= height)
            throw Error("Coordinates exceed matrix dimensions");
        this._data[toOffset(width, x, y)] = v;
        return this;
    }

    /**
     * Get the width of the current matrix.
     * @return {Integer}
     */
    getWidth(){
        return this._width;
    }

    /**
     * Get the width of the current matrix.
     * @return {Integer}
     */
    getHeight(){
        return this._height;
    }

    /**
     * Determine if this is a square matrix.
     * @return {Boolean} True if square, false otherwise.
     */
    isSquare(){
        return this.getWidth() === this.getHeight();
    }

    /**
     * Determine if this is a symmetric matrix.
     * @return {Boolean} True if symmetric, false otherwise.
     */
    isSymmetric(){
        return this.isSquare() && this.duplicate().transpose().equals(this);
    }

    /**
     * Flip this matrix along the horizontal direction.
     * @return {Int8Matrix2D} The current matrix.
     */
    flipX(){
        // strategy: go row by row and switch pairs of cells.
        // in flipY the strategy is more efficient. see comments there.
        const height = this.getHeight();
        const lastInRow = this.getWidth() - 1;
        for (let y = 0 ; y < height ; y++) {
            for (let x = 0 ; x < lastInRow / 2 ; x++) {
                let left = this.get(x, y),
                    right = this.get(lastInRow - x, y);
                this.set(x, y, right);
                this.set(lastInRow - x, y, left);
            }
        }
        return this;
    }

    /**
     * Flip this matrix along the vertical direction.
     * @return {Int8Matrix2D} The current matrix.
     */
    flipY(){
        // strategy: switch whole sections in _data array which correspong
        // to pairs of rows.
        // the cells of the matrix are layed down in the _data array row by row.
        const width = this.getWidth();
        const lastRow = this.getHeight() - 1;

        let firstInTopRow = 0,
            lastInTopRow = width,
            firstInBottomRow = lastRow * width,
            lastInBottomRow = firstInBottomRow + width;

        for (let topRow = 0 ; topRow < lastRow / 2 ; topRow++) {
            // we need to create a copy of the first row since we later
            // override the row in the original data array
            let topRowData = new Int8Array(
                this._data.buffer.slice(
                    firstInTopRow, lastInTopRow
                )
            );

            // it's enough to create a new Int8Array on the same underlying
            // buffer for the second row, since we override it only after
            // overriding the first row
            let bottomRowData = this._data.subarray(
                firstInBottomRow, lastInBottomRow
            );

            this._data.set(bottomRowData, firstInTopRow);
            this._data.set(topRowData, firstInBottomRow);

            firstInTopRow += width;
            lastInTopRow += width;
            firstInBottomRow -= width;
            lastInBottomRow -= width;
        }

        return this;
    }

    /**
     * Convolve this matrix with a kernel.
     * @param  {Int8Matrix2D} kernel A square matrix with an odd length as the
     * kernel of the convolution.
     * @param  {String} method Edge handling method. "zero", "wrap" or "extend".
     * @return {Int8Matrix2D} The current matrix.
     */
    convolve(kernel, method = "zero"){
        const n = _convolve(this, kernel, method);
        return this.replace(n);
    }

    /**
     * Paste another matrix on top of the current one.
     * @param  {Int8Matrix2D} other
     * @param  {Integer} x
     * @param  {Integer} y
     * @return {Int8Matrix2D} The current matrix.
     */
    paste(other, x, y){
        const tWidth = this.getWidth();
        const tHeight = this.getHeight();
        const sWidth = other.getWidth();
        const sHeight = other.getHeight();

        if (x < 0 || y < 0)
            throw Error("Coordinates cannot be negative");

        if (x + sWidth > tWidth || y + sHeight > tHeight)
            throw Error("Source exceeds bounds of target");

        var tOffset = y * tWidth + x,
            sOffset = 0;

        for (let row = 0 ; row < sHeight ; row++) {
            this._data.set(
                other._data.subarray(sOffset, sOffset + sWidth),
                tOffset
            );
            sOffset += sWidth;
            tOffset += tWidth;
        }

        return this;
    }

    /**
     * Extract a new matrix from a rectangular portion of the current matrix
     * @param  {Integer} x1
     * @param  {Integer} y1
     * @param  {Integer} x2
     * @param  {Integer} y2
     * @return {Int8Matrix2D} The extracted matrix.
     */
    extract(x1, y1, x2, y2){
        return _extract(this, x1, y1, x2, y2);
    }

    /**
     * Crop a rectangular portion of the current matrix
     * @param  {Integer} x1
     * @param  {Integer} y1
     * @param  {Integer} x2
     * @param  {Integer} y2
     * @return {Int8Matrix2D} The current matrix.
     */
    crop(x1, y1, x2, y2){
        const n = this.extract(x1, y1, x2, y2);
        return this.replace(n);
    }

    /**
     * Calculate the dot product of this matrix with another matrix.
     * @param  {Int8Matrix2D} other
     * @return {Int8Matrix2D} The current matrix.
     */
    dot(other){
        const n = _dot(this, other);
        return this.replace(n);
    }

    /**
     * Calculate the sum of this matrix with another matrix.
     * @param  {Int8Matrix2D} other
     * @return {Int8Matrix2D} The current matrix.
     */
    plus(other){
        if (other.getWidth() !== this.getWidth() ||
            other.getHeight() !== this.getHeight())
            throw Error("Other matrix must be of identical size");
        for (let x = 0 ; x < this.getWidth() ; x++){
            for (let y = 0 ; y < this.getHeight() ; y++){
                this.set(x, y, this.get(x, y) + other.get(x, y));
            }
        }
        return this;
    }

    /**
     * Calculate the difference of this matrix with another matrix.
     * @param  {Int8Matrix2D} other
     * @return {Int8Matrix2D} The current matrix.
     */
    minus(other){
        if (other.getWidth() !== this.getWidth() ||
            other.getHeight() !== this.getHeight())
            throw Error("Other matrix must be of identical size");
        for (let x = 0 ; x < this.getWidth() ; x++){
            for (let y = 0 ; y < this.getHeight() ; y++){
                this.set(x, y, this.get(x, y) - other.get(x, y));
            }
        }
        return this;
    }

    rotate180(){
        return this.flipX().flipY();
    }

    rotate90(){
        const n = _rotate90(this);
        return this.replace(n);
    }

    rotate270(){
        const n = _rotate270(this);
        return this.replace(n);
    }
}

function toOffset(width, x, y){
    return y * width + x;
}

export default Int8Matrix2D;
