import get from './index';
import isOK from '../status/is-ok';
import isExpired from '../status/is-expired';

export default
function shouldFetch(root, id) {
    const item = get(root, id);

    return isExpired(item) || !isOK(item);
}
