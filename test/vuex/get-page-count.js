import assert from 'assert';

import { attach, options } from '../../src';
import getPageCount from '../../src/vuex/get-page-count';

import { makeStore } from './util';

describe('Vuex.getPageCount(listName, options)', () => {

    it('Should return Infinity when list / pageCount is missing', () => {
        const cmp = { $store: makeStore() };

        const pageCount = getPageCount('all').call(cmp);
        assert.strictEqual(pageCount, Infinity);
    });

    it('Should get correct pageCount', () => {
        let state = attach();
        state = options(state, 'all', { total: 3 });

        const cmp = { $store: makeStore({ state }) };

        const pageCount = getPageCount('all').call(cmp);
        assert.strictEqual(pageCount, 1);
    });

    it('Should get correct pageCount when namespaced', () => {
        let state = attach();
        state = options(state, 'all', { total: 3 });

        // Move state into namespace
        state = { testspace: state };

        const cmp = { $store: makeStore({ state }) };
        const pageCount = getPageCount('all', { namespace: 'testspace' }).call(cmp);
        assert.strictEqual(pageCount, 1);
    });

    it('Should get Infinity when in wrong namespace', () => {
        let state = attach();
        state = options(state, 'all', { total: 3 });

        // Move state into namespace
        state = { otherspace: state };

        const cmp = { $store: makeStore({ state }) };
        const pageCount = getPageCount('all', { namespace: 'testspace' }).call(cmp);
        assert.strictEqual(pageCount, Infinity);
    });

    it('Should respect pageSize configured on list', () => {
        let state = attach();
        state = options(state, 'all', { total: 12, pageSize: 5 });

        const cmp = { $store: makeStore({ state }) };
        const pageCount = getPageCount('all').call(cmp);
        assert.strictEqual(pageCount, 3);
    });

    it('Should respect pageSize passed as option', () => {
        let state = attach();
        state = options(state, 'all', { total: 12 });

        const cmp = { $store: makeStore({ state }) };
        const pageCount = getPageCount('all', {
            params: { pageSize: 5 }
        }).call(cmp);
        assert.strictEqual(pageCount, 3);
    });

    it('Should respect pageSize passed as option when list is configured', () => {
        let state = attach();
        state = options(state, 'all', { total: 12, pageSize: 10 });

        const cmp = { $store: makeStore({ state }) };
        const pageCount = getPageCount('all', {
            params: { pageSize: 5 }
        }).call(cmp);
        assert.strictEqual(pageCount, 3);
    });

});
