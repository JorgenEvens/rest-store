import assert from 'assert';
import sinon from 'sinon';

import { attach, addRange, add } from '../../src';

import getPage from '../../src/vuex/get-page';

function makeStore(custom = {}) {
    return {
        registerModule() {},
        commit() {},
        ...custom
    };
}

describe('Vuex.getPage(selector, listName, options)', () => {

    it('Should get a page for a computed property', () => {
        let state = attach();
        state = addRange(state, 'all', 0, 6, [ 1, 2, 3, 4, 5, 6, 7]);
        for (let i = 1; i <= 7; i++)
            state = add(state, i, { id: i });

        const dispatch = sinon.spy();
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getPage(
            () => 1,
            'all',
            { params: { pageSize: 5 } }
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 5);
        assert(!dispatch.called, 'dispatch not called');
    });

    it('Should get an exact page for a computed property', () => {
        let state = attach();
        state = addRange(state, 'all', 0, 4, [ 1, 2, 3, 4, 5 ]);
        for (let i = 1; i <= 5; i++)
            state = add(state, i, { id: i });

        const dispatch = sinon.spy();
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getPage(
            () => 1,
            'all',
            { params: { pageSize: 5 } }
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 5);
        assert(!dispatch.called, 'dispatch not called');
    });

    it('Should fetch data when missing', () => {
        let state = attach();

        const dispatch = sinon.spy().withArgs('fetchPage', {
            listName: 'all',
            page: 1
        });

        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getPage(
            () => 1,
            'all'
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 0);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should default to first page', () => {
        let state = attach();

        const dispatch = sinon.spy().withArgs('fetchPage', {
            listName: 'all',
            page: 1
        });

        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getPage(
            () => null,
            'all'
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 0);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should support namespaces', () => {
        let state = attach();

        const dispatch = sinon.spy().withArgs('tests/fetchPage', {
            listName: 'all',
            page: 1
        });

        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getPage(
            () => null,
            'all',
            { namespace: 'tests' }
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 0);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should get meta (page, listName, params) from component', () => {
        let state = attach();

        const dispatch = sinon.spy().withArgs('fetchPage', {
            listName: 'tests',
            page: 4,
            test: true
        });

        const cmp = {
            page: 4,
            $store: makeStore({ state, dispatch })
        };

        const computed = getPage(
            'page',
            () => 'tests',
            { params: () => ({ test: true }) }
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 0);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should throw on invalid page', () => {
        assert.throws(function() {
            let state = attach();
            state = addRange(state, 'all', 0, 4, [ 1, 2, 3, 4, 5 ]);
            for (let i = 1; i <= 5; i++)
                state = add(state, i, { id: i });

            const dispatch = sinon.spy();
            const cmp = { $store: makeStore({ state, dispatch }) };

            const computed = getPage(
                () => -1,
                'all',
                { params: { pageSize: 5 } }
            );

            const result = computed.call(cmp);

            assert.equal(result.length, 5);
            assert(!dispatch.called, 'dispatch not called');

        });
    });

    it('Should ignore blacklisted params when hashing', () => {
        let state = attach();
        state = addRange(state, 'all', 0, 4, [ 1, 2, 3, 4, 5 ]);
        for (let i = 1; i <= 5; i++)
            state = add(state, i, { id: i });

        const dispatch = sinon.spy();
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getPage(
            () => 1,
            'all',
            {
                params: { pageSize: 5, otherParam: true },
                hasher: (opts) => {
                    assert.equal(typeof opts.pageSize, 'undefined');
                    assert.strictEqual(opts.otherParam, true);
                    return 'abc';
                }
            }
        );

        computed.call(cmp);
    });

    it('Should not fetch if condition evaluates to false', () => {
        let state = attach();
        const dispatch = sinon.spy();
        const condition = sinon.stub().returns(false);
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getPage(
            () => 1,
            'all',
            { condition }
        );

        computed.call(cmp);

        assert.equal(dispatch.callCount, 0, 'action not dispatched');
        assert.equal(condition.callCount, 1, 'condition called');
    });

    it('Should fetch if condition evaluates to true', () => {
        let state = attach();
        const dispatch = sinon.spy();
        const condition = sinon.stub().returns(true);
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getPage(
            () => 1,
            'all',
            { condition }
        );

        computed.call(cmp);

        assert.equal(dispatch.callCount, 1, 'action dispatched');
        assert.equal(condition.callCount, 1, 'condition called');
    });

});
