import u from 'updeep';

export default
function _applyRange(root, listName, start, end, fn) {
    const entries = (ids = []) => {
        ids = ids.slice();
        end = Math.min(ids.length - 1, end);

        for (let i = start; i <= end; i++)
            ids[i] = fn(ids[i]);

        return ids;
    };

    return u({
        list: {
            [listName]: { entries }
        }
    }, root || {});
}
