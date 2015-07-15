/* jshint esnext:true */

import Int8Matrix2D from "../Int8Matrix2D";

// x1, y1 inclusive
// x2, y2 exclusive
function extract(matrix, x1, y1, x2, y2){
    const oWidth = matrix.getWidth();
    const oHeight = matrix.getHeight();

    if (x1 < 0 || y1 < 0)
        throw Error("Coordinates cannot be negative");

    if (x2 <= x1)
        throw Error("x1 must be smaller than x2");

    if (y2 <= y1)
        throw Error("y1 must be smaller than y2");

    const nWidth = x2 - x1;
    const nHeight = y2 - y1;

    if (x1 + nWidth > oWidth || y1 + nHeight > oHeight)
        throw Error("Coordinates exceed bounds of matrix");

    var oOffset = y1 * oWidth + x1,
        nOffset = 0,
        data = new Int8Array(nWidth * nHeight);

    for (let row = 0 ; row < nHeight ; row++){
        data.set(
            matrix._data.subarray(oOffset, oOffset + nWidth),
            nOffset
        );
        oOffset += oWidth;
        nOffset += nWidth;
    }

    return new Int8Matrix2D(nWidth, nHeight, data);
}

export default extract;
