/* jshint esnext:true */

import {
    reduce as _reduce
} from 'lodash';

class UInt8Matrix{
    constructor(dims, data){
        this._dims = dims.slice(0);
        this._data = data || new ArrayBuffer(toOffset(this._dims));
        this._view = new DataView(this._data);
    }

    duplicate(){
        return new UInt8Matrix(
            this._dims,
            this._data.slice(0)
        );
    }

    getVal(dims){
        return this._view.getUInt8(toOffset(dims));
    }

    setVal(dims, v){
        this._view.setUInt8(toOffset(dims), v);
        return this;
    }

    getDim(n){
        return this._dims[n];
    }
}

function toOffset(dims){
    return _reduce(dims, (res, dim) => {
        return res * dim;
    }, 1);
}

export default Matrix;
