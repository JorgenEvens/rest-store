import _entries from './_entries';
import resources from '../resource/list';

import { ENTRY } from '../constants';

export default
function range(root, listName, start, end) {
    const entries = _entries(root, listName, start, end);
    const ids = entries.map(entry => entry && entry.id);

    const result = resources(root, ids);

    result[ENTRY] = entries;

    return result;
}
