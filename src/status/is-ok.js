import { OK, LOADING } from '../constants';
import isState from './is-state';

function isFilledEntry(e) {
    const hasId = e.id !== null && typeof e.id !== 'undefined';
    const hasData = e.id !== null && typeof e.data !== 'undefined';

    return hasId || hasData;
}

const stateOK = (e, r = true) => r && isState(e, OK) && isFilledEntry(e);
const stateLOADING = (e, r = false) => {
    if (isState(e, LOADING) && isFilledEntry(e))
        return true;

    return r;
};

export default
function isOK(resource) {
    if (isState(resource, stateOK))
        return true;

    if (isState(resource, stateLOADING))
        return true;

    return false;
}
