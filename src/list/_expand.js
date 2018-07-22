export default
function expand(arr, modulo, filler = null) {
    const size = arr.length % modulo;

    if (size === 0 && arr.length > 0)
        return arr;

    const missing = modulo - size;
    const filling = new Array(missing).fill(filler);

    return arr.concat(filling);
}
