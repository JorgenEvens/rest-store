export default
function _list(root, listName) {
    if (!root || !root.list || !root.list[listName])
        return { entries: [] };

    return root.list[listName];
}
