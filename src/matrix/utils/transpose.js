/* jshint esnext:true */

import Int8Matrix2D from "../Int8Matrix2D";

function transpose(matrix){
    const oWidth = matrix.getWidth();
    const oHeight = matrix.getHeight();

    var res = new Int8Matrix2D(oHeight, oWidth);

    for (let x = 0 ; x < oWidth ; x++) {
        for (let y = 0 ; y < oHeight ; y++) {
            res.set(y, x, matrix.get(x, y));
        }
    }

    return res;
}

export default transpose;
