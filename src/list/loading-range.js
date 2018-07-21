import u from 'updeep';

import _expand from './_expand';
import _applyRange from './_apply-range';
import { LOADING } from '../constants';

export default
function loadingRange(root, listName, start, end) {
    const update = entry => ({ ...entry, state: LOADING });

    root = u({
        list: {
            [listName]: {
                entries: (entries = []) => {
                    const length = Math.max(end + 1, entries.length);
                    return _expand(entries, length);
                }
            }
        }
    }, root || {});

    return _applyRange(root, listName, start, end, update);
}
