import { OK } from '../constants';
import isState from './is-state';

export default
function isOK(resource) {
    return isState(resource, OK);
}
