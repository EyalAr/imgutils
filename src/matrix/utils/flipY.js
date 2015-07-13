/* jshint esnext:true */

function flipY(matrix){
    var width = matrix.getWidth();
    for (let x = 0 ; x < width ; x++)
        flipCol(matrix, x);
}

function flipCol(matrix, col){
    var last = matrix.getHeight() - 1;
    for (let y = 0 ; y < last / 2 ; y++){
        let top = matrix.get(col, y),
            bottom = matrix.get(col, last - y);
        matrix.set(col, y, bottom);
        matrix.set(col, last - y, top);
    }
}

export default flipY;
