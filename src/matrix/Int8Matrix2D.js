/* jshint esnext:true */

import _isSquare from "./utils/isSquare";
import _isSymmetric from "./utils/isSymmetric";
import _flipX from "./utils/flipX";
import _flipY from "./utils/flipY";
import _convolve from "./utils/convolve";

class Int8Matrix2D{
    constructor(width, height, data){
        this._width = width;
        this._height = height;
        this._data = data || new Int8Array(this._width * this._height);
        this._transposed = false;
    }

    duplicate(){
        var dup = new Int8Matrix2D(
            this._width,
            this._height,
            new Int8Array(this._data)
        );
        if (this._transposed) dup.transpose();
        return dup;
    }

    copy(other){
        this._data = new Int8Array(other._data);
        this._width = other._width;
        this._height = other._height;
        this._transposed = other._transposed;
    }

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

    transpose(){
        this._transposed = !this._transposed;
        return this;
    }

    get(x, y){
        return this._data[toOffset(
            this._width,
            this._transposed ? y : x,
            this._transposed ? x : y
        )];
    }

    set(x, y, v){
        this._data[toOffset(
            this._width,
            this._transposed ? y : x,
            this._transposed ? x : y
        )] = v;
        return this;
    }

    getWidth(){
        return this._transposed ? this._height : this._width;
    }

    getHeight(){
        return this._transposed ? this._width : this._height;
    }

    isSquare(){
        return _isSquare(this);
    }

    isSymmetric(){
        return _isSymmetric(this);
    }

    flipX(){
        _flipX(this);
        return this;
    }

    flipY(){
        _flipY(this);
        return this;
    }

    convolve(kernel){
        _convolve(this, kernel);
        return this;
    }
}

function toOffset(width, x, y){
    return y * width + x;
}

export default Int8Matrix2D;
