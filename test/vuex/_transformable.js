import sinon from 'sinon';
import assert from 'assert';

import getPage from '../../src/vuex/get-page';
import getRange from '../../src/vuex/get-range';
import getTotal from '../../src/vuex/get-total';
import getResource from '../../src/vuex/get-resource';

import { ENTRY } from '../../src/constants';
import { attach, addPage, add, options } from '../../src';

import { makeStore } from './util';

describe('Vuex.*.transform', () => {

    let $store;

    beforeEach(() => {
        let state = attach();
        state = add(state, 1, { id: 1 });
        state = add(state, 2, { id: 2 });
        state = add(state, 3, { id: 3 });
        state = addPage(state, 'all', 1, [ 1, 2, 3 ]);
        state = options(state, 'all', { total: 3 });

        $store = makeStore({
            state
        });
    });

    it('getPage should have support', () => {
        const transform = sinon.spy(users => {
            return users.filter(u => u.id == 2);
        });
        const cmp = {
            $store,

            page: 1,
            users: getPage('page', 'all')
                .transform(transform)
        };

        const result = cmp.users();

        assert.equal(transform.callCount, 1);
        assert.equal(result.length, 1);
        assert.equal(result[0].id, 2);
    });

    it('getRange should have support', () => {
        const transform = sinon.spy(users => {
            return users.filter(u => u.id == 2);
        });
        const cmp = {
            $store,

            range: { start: 0, end: 3 },
            users: getRange('range', 'all')
                .transform(transform)
        };

        const result = cmp.users();

        assert.equal(transform.callCount, 1);
        assert.equal(result.length, 1);
        assert.equal(result[0].id, 2);
    });

    it('getResource should have support', () => {
        const transform = sinon.spy(user => ({ ...user, name: 'test' }));
        const cmp = {
            $store,

            resourceId: 2,
            user: getResource('resourceId').transform(transform)
        };

        const result = cmp.user();

        assert.equal(transform.callCount, 1);
        assert.equal(result.id, 2);
        assert.equal(result.name, 'test');
    });

    it('getTotal should have support', () => {
        const transform = sinon.spy(total => total - 1);
        const cmp = {
            $store,

            total: getTotal('all').transform(transform)
        };

        const result = cmp.total();

        assert.equal(transform.callCount, 1);
        assert.equal(result, 2);
    });

    it('should support multiple transforms', () => {
        const transform1 = sinon.spy(user => ({ ...user, name: 'test' }));
        const transform2 = sinon.spy(user => ({ ...user, username: 'test321' }));
        const cmp = {
            $store,

            resourceId: 2,
            user: getResource('resourceId')
                .transform(transform1)
                .transform(transform2)
        };

        const result = cmp.user();

        assert.equal(transform1.callCount, 1);
        assert.equal(transform2.callCount, 1);
        assert.equal(result.id, 2);
        assert.equal(result.name, 'test');
        assert.equal(result.username, 'test321');
    });

    it('should preserve response state', () => {
        const transform = sinon.spy(users => users.filter(u => !!u));
        const cmp = {
            $store,

            page: 1,
            users: getPage('page', 'all').transform(transform)
        };

        const result = cmp.users();

        assert.equal(transform.callCount, 1);
        assert(result[ENTRY]);
        assert.equal(result[ENTRY].length, 3);
    });

});
