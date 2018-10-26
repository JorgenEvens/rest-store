import assert from 'assert';

import { attach, options } from '../../src';
import getTotal from '../../src/vuex/get-total';

import { makeStore } from './util';

describe('Vuex.getTotal(listName, options)', () => {

    it('Should return Infinity when list / total is missing', () => {
        const cmp = { $store: makeStore() };

        const total = getTotal('all').call(cmp);
        assert.strictEqual(total, Infinity);
    });

    it('Should get correct total', () => {
        let state = attach();
        state = options(state, 'all', { total: 3 });

        const cmp = { $store: makeStore({ state }) };

        const total = getTotal('all').call(cmp);
        assert.strictEqual(total, 3);
    });

    it('Should get correct total when namespaced', () => {
        let state = attach();
        state = options(state, 'all', { total: 3 });

        // Move state into namespace
        state = { testspace: state };

        const cmp = { $store: makeStore({ state }) };
        const total = getTotal('all', { namespace: 'testspace' }).call(cmp);
        assert.strictEqual(total, 3);
    });

    it('Should get Infinity when in wrong namespace', () => {
        let state = attach();
        state = options(state, 'all', { total: 3 });

        // Move state into namespace
        state = { otherspace: state };

        const cmp = { $store: makeStore({ state }) };
        const total = getTotal('all', { namespace: 'testspace' }).call(cmp);
        assert.strictEqual(total, Infinity);
    });

});
