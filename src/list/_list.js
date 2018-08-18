export default
function _list(root, listName) {
    if (!root || !root.list || !root.list[listName])
        return { entries: [] };

    const list = root.list[listName];
    if (Array.isArray(list.entries))
        return list;

    return {
        entries: [],
        ...list
    };
}
