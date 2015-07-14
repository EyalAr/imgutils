/* jshint esnext:true */

import _isSquare from "./utils/isSquare";
import _isSymmetric from "./utils/isSymmetric";
import _flipX from "./utils/flipX";
import _flipY from "./utils/flipY";
import _convolve from "./utils/convolve";

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
        this._transposed = false;
    }

    /**
     * Create a new instance of Int8Matrix2D which is identical to the current
     * one. Data is duplicated.
     * @return {Int8Matrix2D}
     */
    duplicate(){
        var dup = new Int8Matrix2D(
            this._width,
            this._height,
            new Int8Array(this._data)
        );
        if (this._transposed) dup.transpose();
        return dup;
    }

    /**
     * Copy another matrix into this one. Data is duplicated.
     * @param  {Int8Matrix2D} other The other matrix to copy.
     * @return {Int8Matrix2D} The current matrix.
     */
    copy(other){
        this._data = new Int8Array(other._data);
        this._width = other._width;
        this._height = other._height;
        this._transposed = other._transposed;
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
        this._transposed = !this._transposed;
        return this;
    }

    /**
     * Get the value of a cell in the matrix.
     * @param  {Integer} x
     * @param  {Integer} y
     * @return {Integer}
     */
    get(x, y){
        return this._data[toOffset(
            this._width,
            this._transposed ? y : x,
            this._transposed ? x : y
        )];
    }

    /**
     * Set the value of a cell in the matrix.
     * @param  {Integer} x
     * @param  {Integer} y
     * @param  {Integer} v The value to set in the cell.
     * @return {Int8Matrix2D} The current matrix.
     */
    set(x, y, v){
        this._data[toOffset(
            this._width,
            this._transposed ? y : x,
            this._transposed ? x : y
        )] = v;
        return this;
    }

    /**
     * Get the width of the current matrix.
     * @return {Integer}
     */
    getWidth(){
        return this._transposed ? this._height : this._width;
    }

    /**
     * Get the width of the current matrix.
     * @return {Integer}
     */
    getHeight(){
        return this._transposed ? this._width : this._height;
    }

    /**
     * Determine if this is a square matrix.
     * @return {Boolean} True if square, false otherwise.
     */
    isSquare(){
        return _isSquare(this);
    }

    /**
     * Determine if this is a symmetric matrix.
     * @return {Boolean} True if symmetric, false otherwise.
     */
    isSymmetric(){
        return _isSymmetric(this);
    }

    /**
     * Flip this matrix along the horizontal direction.
     * @return {Int8Matrix2D} The current matrix.
     */
    flipX(){
        _flipX(this);
        return this;
    }

    /**
     * Flip this matrix along the vertical direction.
     * @return {Int8Matrix2D} The current matrix.
     */
    flipY(){
        _flipY(this);
        return this;
    }

    /**
     * Convolve this matrix with a kernel.
     * @param  {Int8Matrix2D} kernel A square matrix with an odd length as the
     * kernel of the convolution.
     * @return {Int8Matrix2D} The current matrix.
     */
    convolve(kernel){
        _convolve(this, kernel);
        return this;
    }
}

function toOffset(width, x, y){
    return y * width + x;
}

export default Int8Matrix2D;
