import { is } from '../utils';
import isState from './is-state';

function _isExpired(entry) {
    if (!entry || !is(entry.expires, 'number'))
        return false;

    return entry.expires <= Date.now();
}

export default
function isExpired(resource) {
    return isState(resource, (e, r = false) => {
        return r || _isExpired(e);
    });
}
