import ids from './ids';
import resources from '../resource/list';

export default
function range(root, listName, start, end) {
    const entries = ids(root, listName, start, end);
    return resources(root, entries);
}
