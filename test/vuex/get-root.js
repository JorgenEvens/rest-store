import assert from 'assert';

import getRoot from '../../src/vuex/get-root';

describe('Vuex.getRoot(state, namespace)', () => {

    it('Should get non namespaced state', () => {
        const state = {};

        const root = getRoot(state);
        assert.strictEqual(root, state);
    });

    it('Should get non namespaced state', () => {
        const state = {};

        const root = getRoot(state, '');
        assert.strictEqual(root, state);
    });

    it('Should get non namespaced state', () => {
        const state = {};

        const root = getRoot(state, null);
        assert.strictEqual(root, state);
    });

    it('Should get namespaced state', () => {
        const moduleA = {};
        const state = { moduleA };

        const root = getRoot(state, 'moduleA');

        assert.strictEqual(root, moduleA);
    });

    it('Should get nested namespaced state', () => {
        const moduleA = {};
        const moduleB = { moduleA };
        const state = { moduleB };

        const root = getRoot(state, 'moduleB/moduleA');

        assert.strictEqual(root, moduleA);
    });

    it('Should return undefined on missing module', () => {
        const moduleA = {};
        const moduleB = { moduleA };
        const state = { moduleB };

        const root = getRoot(state, 'moduleC/moduleA');

        assert.strictEqual(root, undefined);
    });

    it('Should return undefined on missing module', () => {
        const moduleA = {};
        const moduleB = { moduleA };
        const state = { moduleB };

        const root = getRoot(state, 'moduleB/moduleC');

        assert.strictEqual(root, undefined);
    });

});
