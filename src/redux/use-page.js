import { useDispatch } from 'react-redux';

import shouldFetchPage from '../list/should-fetch-page';
import fetchPage from '../list/page';

import _compact from './_compact';
import useRoot from './use-root';
import { buildAction } from './middleware';
import { wrapDispatch } from '../utils/throttled-dispatch';

const pageDefaults = {
    namespace: null,
    fetch: 'fetchPage',
    condition: true
};

export default
function usePage(page, listName, options = {}) {
    options = { ...pageDefaults, ...options };

    const {
        condition,
        namespace,
        params,
    } = options;

    let { fetch } = options;

    const dispatch = wrapDispatch(useDispatch());
    const root = useRoot(namespace);

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    if (page < 1)
        throw new Error('page must be greater than 0');

    if (condition && shouldFetchPage(root, listName, page)) {
        const payload = { listName, page, ...params };
        dispatch(buildAction(fetch, payload));
    }

    const entries = fetchPage(root, listName, page, params);
    return _compact(entries);
}
