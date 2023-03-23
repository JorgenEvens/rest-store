import _list from './_list';
import _total from './_total';
import _entries from './_entries';
import resource from '../resource';

import { setEntry } from '../utils/entry';
import isError from '../status/is-error';

export default
function range(root, listName, start, end) {
    // Handle empty lists
    const list = _list(root, listName);
    if (_total(list) < 1) {
        const entries = [];
        setEntry(entries, list);
        return entries;
    }

    const entries = _entries(root, listName, start, end);
    const result = entries.map(entry => {
        if (entry && isError(entry))
            return entry.error;

        return resource(root, entry && entry.id);
    });

    setEntry(result, entries);

    return result;
}
