import _list from './_list';
import _total from './_total';
import _entries from './_entries';
import resource from '../resource';

import { ENTRY } from '../constants';
import isError from '../status/is-error';

export default
function range(root, listName, start, end) {
    // Handle empty lists
    const list = _list(root, listName);
    if (_total(list) < 1) {
        const entries = [];
        entries[ENTRY] = list;
        return entries;
    }

    const entries = _entries(root, listName, start, end);
    const result = entries.map(entry => {
        if (entry && isError(entry))
            return entry.error;

        return resource(root, entry && entry.id);
    });

    result[ENTRY] = entries;

    return result;
}
