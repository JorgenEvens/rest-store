import isOK from './is-ok';
import isLoading from './is-loading';

export default
function isPending(obj) {
    return !isOK(obj) && isLoading(obj);
}
