import { setEntry } from '../utils/entry';

export default
function _update(entry, updates) {
    entry = {
        ...entry,
        ...updates
    };

    if (entry.data) {
        setEntry(entry.data, entry);
    }

    if (entry.error)
        setEntry(entry.error, entry);

    return entry;
}
