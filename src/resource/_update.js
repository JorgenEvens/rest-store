import { ENTRY } from '../constants';

export default
function _update(entry, updates) {
    entry = {
        ...entry,
        ...updates
    };

    entry.data = entry.data && {
        ...entry.data,
        [ENTRY]: entry
    };

    return entry;
}
