import _get from 'lodash/get';

import useList from './_use-list';

export default
function useOption(listName, option, namespace) {
    const list = useList(listName, namespace);

    return _get(list, option);
}
