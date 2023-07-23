import { useDispatch } from 'react-redux';

import useRoot from './use-root';
import { buildAction, PHASE_INIT } from './middleware';

import shouldFetch from '../resource/should-fetch';
import resource from '../resource';

import { wrapDispatch } from '../utils/throttled-dispatch';

export default
function useResource(id, options) {
    const {
        params,
        namespace,
        condition = true,
        placeholder = null,
        fetch = 'fetch',
    } = options;

    const dispatch = wrapDispatch(useDispatch());
    const root = useRoot(namespace);

    if (condition && shouldFetch(root, id)) {
        const isNamespaced = (namespace && typeof fetch === 'string');
        const type = isNamespaced ? `${namespace}/${fetch}` : fetch;

        const payload = { id, ...params };
        const action = buildAction(type, payload, {
            phase: PHASE_INIT,
        });

        dispatch(action);
    }

    const value = resource(root, id);

    return (value === null) ?
        placeholder :
        value;
}
