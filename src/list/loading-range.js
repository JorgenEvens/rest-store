import _expandList from './_expand-list';
import _applyRange from './_apply-range';
import _applyEmptyState from './_apply-empty-state';
import { LOADING } from '../constants';

export default
function loadingRange(root, listName, start, end) {
    const update = entry => ({ ...entry, state: LOADING });

    root = _expandList(root, listName, end);
    root = _applyRange(root, listName, start, end, update);
    root = _applyEmptyState(root, listName, { state: LOADING });

    return root;
}
