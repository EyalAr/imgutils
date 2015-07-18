/* jshint esnext:true */

import Int8Matrix2D from "../Int8Matrix2D";

function rotate90(matrix){
    const nWidth = matrix.getHeight();
    const nHeight = matrix.getWidth();

    var res = new Int8Matrix2D(nWidth, nHeight);

    for (let x = 0 ; x < nWidth ; x++) {
        for (let y = 0 ; y < nHeight ; y++) {
            res.set(x, y, matrix.get(y, nWidth - x - 1));
        }
    }

    return res;
}

export default rotate90;
