import { ENTRY } from '../constants';

export default
function _getEntry(resource) {
    if (!resource)
        return null;

    if (resource[ENTRY])
        return resource[ENTRY];

    if (typeof resource.state === 'symbol')
        return resource;

    return null;
}
