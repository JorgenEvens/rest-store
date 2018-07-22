import _getEntry from './_get-entry';

export default
function isState(resource, state) {
    if (resource === state)
        return true;

    const entry = _getEntry(resource);

    if (!entry)
        return false;

    const compare = typeof state === 'function' ?
        state : (e, r = false) => r || e.state === state;

    if (Array.isArray(entry))
        return entry.reduce((r, e) => compare(e, r), (void 0));

    return compare(entry);
}
