import _getList from './_get-list';
import _total from '../list/_total';

export default
function getTotal(listName, options = {}) {
    const getList = _getList(listName, options);

    return function() {
        const list = getList(this);

        return _total(list);
    };
}
