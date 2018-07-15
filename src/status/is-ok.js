import { OK, LOADING } from '../constants';
import isState from './is-state';
import _getEntry from './_get-entry';

export default
function isOK(resource) {
    if (isState(resource, OK))
        return true;

    const entry = _getEntry(resource);
    if (isState(resource, LOADING) && entry.data)
        return true;

    return false;
}
