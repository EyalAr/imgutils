/* jshint esnext:true */

import _flipX from "./utils/flipX";
import _flipY from "./utils/flipY";
import _convolve from "./utils/convolve";

class UInt8Matrix2D{
    constructor(width, height, data){
        this._width = width;
        this._height = height;
        this._data = data || new Uint8Array(this._width * this._height);
    }

    duplicate(){
        return new UInt8Matrix2D(
            this._width,
            this._height,
            new Uint8Array(this._data)
        );
    }

    get(x, y){
        return this._data[toOffset(this._width, x, y)];
    }

    set(x, y, v){
        this._data[toOffset(this._width, x, y)] = v;
        return this;
    }

    getWidth(){
        return this._width;
    }

    getHeight(){
        return this._height;
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

export default UInt8Matrix2D;
