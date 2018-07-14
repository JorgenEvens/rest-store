import { ENTRY } from '../constants';

export default
function _getEntry(resource) {
    return resource && resource[ENTRY];
}
