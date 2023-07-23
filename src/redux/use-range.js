import { useDispatch } from 'react-redux';

import shouldFetchRange from '../list/should-fetch-range';
import fetchRange from '../list/range';

import _compact from './_compact';
import useRoot from './use-root';
import { buildAction } from './middleware';
import { wrapDispatch } from '../utils/throttled-dispatch';

const pageDefaults = {
    namespace: null,
    fetch: 'fetchRange',
    condition: true
};

export default
function useRange(range, listName, options = {}) {
    options = { ...pageDefaults, ...options };

    const {
        condition,
        namespace,
        params,
    } = options;

    let { fetch } = options;

    const dispatch = wrapDispatch(useDispatch());
    const root = useRoot(namespace);

    const { start = 0, end = 9 } = range || {};

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    if (condition && shouldFetchRange(root, listName, start, end)) {
        const payload = { listName, start, end, ...params };
        dispatch(buildAction(fetch, payload));
    }

    const entries = fetchRange(root, listName, start, end, params);
    return _compact(entries);
}
