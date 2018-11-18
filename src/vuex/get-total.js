import _getList from './_get-list';
import _total from '../list/_total';
import _transformable from './_transformable';

export default
function getTotal(listName, options = {}) {
    const getList = _getList(listName, options);

    return _transformable(function() {
        const list = getList(this);

        return _total(list);
    });
}
