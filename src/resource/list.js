import resource from './index';

export default
function resources(root, ids) {
    if (!Array.isArray(ids))
        return [];

    return ids.map(id => resource(root, id));
}
