/* jshint esnext:true */

function flipX(matrix){
    var height = matrix.getHeight();
    for (let y = 0 ; y < height ; y++)
        flipRow(matrix, y);
}

function flipRow(matrix, row){
    var last = matrix.getWidth() - 1;
    for (let x = 0 ; x < last / 2 ; x++){
        let left = matrix.get(x, row),
            right = matrix.get(last - x, row);
        matrix.set(x, row, right);
        matrix.set(last - x, row, left);
    }
}

export default flipX;
