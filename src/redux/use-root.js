import { useSelector } from 'react-redux';

import _getRoot from './_get-root';

export default
function useRoot(namespace) {
    return useSelector(state => _getRoot(state, namespace));
}
