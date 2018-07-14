import { isUndefined } from '../utils';

export default
function resource(root, id) {
    if (!root || !root.resources || !root.resources[id])
        return null;

    const { data, state } = root.resources[id];

    return isUndefined(data) ? state : data;
}
