import _applyRange from './_apply-range';
import _remove from './_remove';

export default
function removeRange(root, listName, start, end) {
    return _applyRange(root, listName, start, end, _remove);
}
