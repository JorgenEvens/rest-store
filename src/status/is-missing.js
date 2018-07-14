import { isNil } from '../utils';

export default
function isMissing(resource) {
    return isNil(resource);
}
