export default
function _expire(entry, expires) {
    return entry && { ...entry, expires };
}
