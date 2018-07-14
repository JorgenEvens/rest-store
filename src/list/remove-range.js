import u from 'updeep';

export default
function removeRange(root, listName, start, end) {
    const entries = (ids = []) => {
        ids = ids.slice();
        end = Math.min(ids.length - 1, end);

        for (let i = start; i <= end; i++)
            ids[i] = null;

        return ids;
    };

    return u({
        list: {
            [listName]: { entries }
        }
    }, root || {});
}
