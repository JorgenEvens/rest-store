import { ERROR } from '../constants';
import isState from './is-state';

export default
function isError(resource) {
    return isState(resource, ERROR);
}
