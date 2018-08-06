export default
function compact(arr) {
    let i = arr.length;
    while (i-- > 0)
        if (!arr[i])
            arr.splice(i, 1);

    return arr;
}
