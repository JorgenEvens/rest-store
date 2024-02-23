import _get from 'lodash/get';
import _toPath from 'lodash/toPath';

export
function has(obj, keys) {
    if (typeof keys === 'string')
        keys = _toPath(keys);

    if (keys.length < 1)
        return true;

    if (typeof obj !== 'object')
        return false;

    const key = keys[0];
    if (key in obj)
        return has(obj[key], keys.slice(1));

    return false;

}

export default
function get(obj, path) {
    if (has(obj, path))
        return _get(obj, path);
}
