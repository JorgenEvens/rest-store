import _get from 'lodash/get';
import _getList from './_get-list';

export default
function getOption(listName, option, options = {}) {
    const getList = _getList(listName, options);

    return function() {
        const list = getList(this);

        return _get(list, option);
    };
}
