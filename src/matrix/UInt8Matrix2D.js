/* jshint esnext:true */

import UInt8Matrix from "./UInt8Matrix";
import { flipX as _flipX } from "./utils/flipX";
import { flipY as _flipY } from "./utils/flipY";
import { convolve as _convolve } from "./utils/convolve";

class UInt8Matrix2D extends UInt8Matrix{
    constructor(width, height, data){
        super([width, height], data);
    }

    duplicate(){
        return new UInt8Matrix2D(
            this.getWidth(),
            this.getHeight(),
            this._data.slice(0)
        );
    }

    get(x, y){
        return super.getVal([x, y]);
    }

    set(x, y, v){
        return super.setVal([x, y], v);
    }

    getWidth(){
        return super.getDim(0);
    }

    getHeight(){
        return super.getDim(1);
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

export default Matrix;
