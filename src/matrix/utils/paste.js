/* jshint esnext:true */

function paste(target, source, x, y){
    const tWidth = target.getWidth();
    const tHeight = target.getHeight();
    const sWidth = source.getWidth();
    const sHeight = source.getHeight();

    if (x < 0 || y < 0)
        throw Error("Coordinates cannot be negative");

    if (x + sWidth > tWidth || y + sHeight > tHeight)
        throw Error("Source exceeds bounds of target");

    const offset = y * tWidth + x;
    target._data.set(source._data, offset);
}

export default paste;
