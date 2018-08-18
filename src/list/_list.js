import { OK } from '../constants';

const defaults = {
    entries: [],
    state: OK
};

export default
function _list(root, listName) {
    if (!root || !root.list || !root.list[listName])
        return defaults;

    const list = root.list[listName];
    return { ...defaults, ...list };
}
