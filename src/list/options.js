import u from 'updeep';

export default
function options(root, listName, opts) {
    return u({
        list: {
            [listName]: opts
        }
    }, root || {});
}
