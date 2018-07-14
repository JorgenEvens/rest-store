import _getEntry from './_get-entry';

export default
function isState(resource, state) {
    if (resource === state)
        return true;

    const entry = _getEntry(resource);

    if (!entry)
        return false;

    return entry.state === state;
}
