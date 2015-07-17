/* jshint esnext:true */

import Int8Matrix2D from "../Int8Matrix2D";

function dot(M, N){
    if (M.getWidth() !== N.getHeight() || M.getHeight() !== N.getWidth())
        throw Error("Matrices dimensions not suitable for dot product");

    const rWidth = N.getWidth();
    const rHeight = M.getHeight();
    const rCount = M.getWidth();

    var res = new Int8Matrix2D(rWidth, rHeight);

    for (let x = 0 ; x < rWidth ; x++){
        for (let y = 0 ; y < rHeight ; y++){
            let v = 0;
            for (let i = 0 ; i < rCount ; i++){
                v += M.get(i, y) * N.get(x, i);
            }
            res.set(x, y, v);
        }
    }

    return res;
}

export default dot;
