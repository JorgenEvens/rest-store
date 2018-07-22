import _entries from './_entries';
import resource from '../resource';

import { ENTRY } from '../constants';
import isError from '../status/is-error';

export default
function range(root, listName, start, end) {
    const entries = _entries(root, listName, start, end);
    const result = entries.map(entry => {
        if (entry && isError(entry))
            return entry.error;

        return resource(root, entry && entry.id);
    });

    result[ENTRY] = entries;

    return result;
}
