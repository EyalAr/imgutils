/* jshint esnext:true */

import Int8Matrix2D from "../Int8Matrix2D";

const ZERO_METHOD   = 0;
const WRAP_METHOD   = 1;
const EXTEND_METHOD = 2;

function convolve(matrix, kernel, method = "zero"){
    if (!kernel.isSquare())
        throw Error("Convolution kernel must be a square matrix");
    if (kernel.getWidth % 2 === 0)
        throw Error("Convolution kernel must have an odd length");
    if (!kernel.isSymmetric())
        kernel.flipX().flipY();

    method = method.toLowerCase();
    if (method === "zero") method = ZERO_METHOD;
    else if (method === "wrap") method = WRAP_METHOD;
    else if (method === "extend") method = EXTEND_METHOD;
    else throw  Error("Unknown convolution edge handling method");

    const mWidth = matrix.getWidth();
    const mHeight = matrix.getHeight();
    const kWidth = kernel.getWidth();
    const kHeight = kernel.getHeight();
    const rx = (kWidth - 1) / 2;
    const ry = (kHeight - 1) / 2;

    var res = new Int8Matrix2D(mWidth, mHeight);

    for (let x = 0 ; x < mWidth ; x++) {
        for (let y = 0 ; y < mHeight ; y++) {
            let v = 0;
            for (let dx = -rx ; dx <= rx ; dx++) {
                for (let dy = -ry ; dy <= ry ; dy++) {
                    let mv = get(matrix, x + dx, y + dy, method),
                        kv = kernel.get(dx + rx, dy + ry);
                    v += mv * kv;
                }
            }
            res.set(x, y, v);
        }
    }

    return res;
}

function get(matrix, x, y, method){
    const width = matrix.getWidth();
    const height = matrix.getHeight();

    if (x >= 0 && y >= 0 && x < width && y < height){
        return matrix.get(x, y);
    }

    if (method === ZERO_METHOD) {
        return 0;
    }

    if (method === WRAP_METHOD) {
        if (x < 0) x += width;
        else if (x >= width) x -= width;
        if (y < 0) y += height;
        else if (y >= height) y -= height;
    } else {
        if (x < 0) x = 0;
        else if (x >= width) x = width - 1;
        if (y < 0) y = 0;
        else if (y >= height) y = height - 1;
    }

    return get(matrix, x, y, method);
}

export default convolve;
