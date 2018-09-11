let isFirst = true;

export default
function throttleAll(methods) {
    if (isFirst) {
        isFirst = false;
        // eslint-disable-next-line no-console
        console.warn('[rest-store] throttleAll is no longer required, please remove it');
    }
    return methods;
}
