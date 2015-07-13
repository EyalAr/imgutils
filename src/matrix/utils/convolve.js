/* jshint esnext:true */

var ZERO_METHOD   = 0,
    WRAP_METHOD   = 1,
    EXTEND_METHOD = 2;

function convolve(matrix, kernel, method = "zero"){
    if (!kernel.isSquare())
        throw Error("Convolution kernel must be a square matrix");
    if (kernel.getWidth % 2 === 0)
        throw Error("Convolution kernel must have an odd length");
    if (!kernel.isSymmetric())
        kernel = kernel.flipX().flipY();

    method = method.toLowerCase();
    if (method === "zero") method = ZERO_METHOD;
    else if (method === "wrap") method = WRAP_METHOD;
    else if (method === "extend") method = EXTEND_METHOD;
    else throw  Error("Unknown convolution edge handling method");

    var tmp = matrix.duplicate();

    for (let x = 0 ; x < matrix.getWidth() ; x++) {
        for (let y = 0 ; y < matrix.getHeight() ; y++) {
            var v = 0,
                dx = (matrix.getWidth() - 1) / 2,
                dy = (matrix.getHeight() - 1) / 2;
            for (let kx = -dx ; kx <= dx ; kx++) {
                for (let ky = -dy ; ky <= dy ; ky++) {
                    var m = get(matrix, x + kx, y + ky, method),
                        k = kernel.get(kx + dx, ky + dy);
                    v += m * k;
                }
            }
            tmp.set(x, y, v);
        }
    }

    matrix.copy(tmp);
}

function get(matrix, x, y, method){
    var width = matrix.getWidth(),
        height = matrix.getHeight();

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
