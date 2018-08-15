import sinon from 'sinon';
import assert from 'assert';

import { connect, updateListHash, createModule } from '../../src/vuex/_state-helper';

describe('Vuex.StateHelper', () => {

    let sandbox = null;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should connect new state helper', () => {
        const store = {
            registerModule(name, module) {
                assert.equal(typeof name, 'string');

                assert(module.namespaced, 'is namespaced');
                assert(typeof module.state.hooked, 'symbol', 'hooked is symbol');
                assert(typeof module.mutations.updateListHash, 'function', 'has helper mutation');

                store.state[name] = module.state;
            },
            state: {}
        };

        sandbox.spy(store, 'registerModule');

        connect(store);

        assert(store.state['_rest-store']);

        connect(store);

        assert.equal(store.registerModule.callCount, 1, 'called only once');
    });

    it('Should commit new hash for list', () => {
        const params = {
            listName: 'all',
            namespace: 'moduleA',
            hash: 'def'
        };

        const store = {
            registerModule: sandbox.spy(),
            commit: sandbox.spy()
                .withArgs('_rest-store/updateListHash', params),
            state: {
                moduleA: {
                    list: {
                        all: {
                            hash: 'abc'
                        }
                    }
                }
            }
        };

        updateListHash(store, 'moduleA', 'all', 'def');

        assert.equal(store.registerModule.callCount, 1, 'helper connected');
        assert.equal(store.commit.callCount, 1, 'commit called once');
    });

    it('Should do nothing on hash match', () => {
        const store = {
            registerModule: sandbox.spy(),
            commit: sandbox.spy(),
            state: {
                moduleA: {
                    list: {
                        all: {
                            hash: 'abc'
                        }
                    }
                }
            }
        };

        updateListHash(store, 'moduleA', 'all', 'abc');

        assert.equal(store.registerModule.callCount, 0, 'helper connected');
        assert.equal(store.commit.callCount, 0, 'commit called once');
    });

    it('Should update hash in store state', () => {
        const store = {
            state: {
                moduleA: {
                    list: {
                        all: {
                            entries: [],
                            hash: 'abc'
                        }
                    }
                }
            }
        };

        const helper = createModule(store);
        const params = {
            listName: 'all',
            namespace: 'moduleA',
            hash: 'def'
        };

        helper.mutations.updateListHash(helper.state, params);

        assert.equal(store.state.moduleA.list.all.hash, 'def', 'hash has been updated');
    });

    it('Should not update identical hash in store state', () => {
        const store = {
            state: {
                moduleA: {
                    list: {
                        all: {
                            entries: [],
                            hash: 'abc'
                        }
                    }
                }
            }
        };

        const helper = createModule(store);
        const params = {
            listName: 'all',
            namespace: 'moduleA',
            hash: 'abc'
        };

        helper.mutations.updateListHash(helper.state, params);

        assert.equal(store.state.moduleA.list.all.hash, 'abc', 'hash has been updated');
    });

});
