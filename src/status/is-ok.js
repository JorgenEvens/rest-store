import { OK, LOADING } from '../constants';
import isState from './is-state';

function isFilledEntry(e) {
    const hasId = e.id !== null && typeof e.id !== 'undefined';
    const hasData = e.id !== null && typeof e.data !== 'undefined';

    // dangerous, might need to add types as object metadata later
    const isList = Array.isArray(e.entries) && typeof e.state === 'symbol';

    return hasId || hasData || isList;
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
