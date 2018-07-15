import _entries from './_entries';

export default
function ids(root, listName, start, end) {
    return _entries(root, listName, start, end)
        .map(entry => entry && entry.id);
}
