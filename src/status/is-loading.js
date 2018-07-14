import { LOADING } from '../constants';
import isState from './is-state';

export default
function isLoading(resource) {
    return isState(resource, LOADING);
}
