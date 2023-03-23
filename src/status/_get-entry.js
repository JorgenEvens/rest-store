import { getEntry } from '../utils/entry';

export default
function _getEntry(resource) {
    if (!resource)
        return null;

    const entry = getEntry(resource);
    if (entry)
        return entry;

    if (typeof resource.state === 'symbol')
        return resource;

    return null;
}
