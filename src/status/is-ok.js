import { OK, LOADING } from '../constants';
import isState from './is-state';

const stateOK = (e, r = true) => r && isState(e, OK);
const stateLOADING = (e, r = false) => {
    if (isState(e, LOADING) && e && (e.data || e.id))
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
