import _list from '../list/_list';

import useRoot from './use-root';

export default
function useList(listName, namespace) {
    const root = useRoot(namespace);
    return _list(root, listName);
}
