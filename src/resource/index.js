import { isUndefined } from '../utils';
import isError from '../status/is-error';

export default
function resource(root, id) {
    if (!root || !root.resources || !root.resources[id])
        return null;

    const { data, error, state } = root.resources[id];
    if (isError(state))
        return error;

    return isUndefined(data) ? state : data;
}
