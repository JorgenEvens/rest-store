export default
function resource(root, id) {
    if (!root || !root.resources || !root.resources[id])
        return null;

    return root.resources[id].data;
}
