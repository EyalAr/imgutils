/* jshint esnext:true */

function isSymmetric(matrix){
    return matrix.isSquare() && matrix.duplicate().transpose().equals(matrix);
}

export default isSymmetric;
