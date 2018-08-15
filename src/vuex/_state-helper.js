import apply from './apply';
import getRoot from './get-root';

import _list from '../list/_list';
import options from '../list/options';
import expireAll from '../list/expire-all';

const NAME = '_rest-store';
const HOOKED = Symbol('rest-store hooked');

export const createModule = (store) => ({
    namespaced: true,

    state: { hooked: HOOKED },

    mutations: {
        updateListHash(state, opts) {
            const { namespace, listName, hash } = opts;
            const root = getRoot(store.state, namespace);
            const list = _list(root, listName);

            if (list.hash === hash)
                return;

            apply(options, root, listName, { hash });
            apply(expireAll, root, listName);
        }
    }
});

export function updateListHash(store, namespace, listName, hash) {
    const { commit, state } = store;
    const root = getRoot(state, namespace);
    const list = _list(root, listName);

    if (list.hash === hash)
        return;

    connect(store);
    commit('_rest-store/updateListHash', { listName, namespace, hash });
}

export function connect(store) {
    const module = store.state[NAME];

    if (module && module.hooked == HOOKED)
        return;

    const m = createModule(store);
    store.registerModule(NAME, m);
}

export default module;
