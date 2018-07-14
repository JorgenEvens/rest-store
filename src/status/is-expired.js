import { is } from '../utils';
import _getEntry from './_get-entry';

export default
function isExpired(resource) {
    const entry = _getEntry(resource);

    if (!entry || !is(entry.expires, 'number'))
        return false;

    return entry.expires <= Date.now();
}
