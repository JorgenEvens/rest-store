import _expandList from './_expand-list';
import _applyRange from './_apply-range';
import { ERROR } from '../constants';

export default
function errorRange(root, listName, start, end, error) {
    const update = entry => ({ ...entry, state: ERROR, error });

    root = _expandList(root, listName, end);

    return _applyRange(root, listName, start, end, update);
}
