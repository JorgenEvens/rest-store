import _expandList from './_expand-list';
import _applyRange from './_apply-range';
import { LOADING } from '../constants';

export default
function loadingRange(root, listName, start, end) {
    const update = entry => ({ ...entry, state: LOADING });

    root = _expandList(root, listName, end);

    return _applyRange(root, listName, start, end, update);
}
