import u from 'updeep';

export default
function expireRange(root, listName, start, end) {
    const expires = Date.now() - 1;

    const entries = (ids = []) => {
        ids = ids.slice();
        end = Math.min(ids.length - 1, end);

        for (let i = start; i <= end; i++) {
            const entry = ids[i];

            ids[i] = entry && { ...entry, expires };
        }

        return ids;
    };

    return u({
        list: {
            [listName]: { entries }
        }
    }, root || {});
}
