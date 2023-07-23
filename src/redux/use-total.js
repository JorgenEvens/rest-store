import _total from '../list/_total';

import useList from './_use-list';

export default
function useTotal(listName, options) {
    const list = useList(listName, options);

    return _total(list);
}
