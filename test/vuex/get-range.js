import assert from 'assert';
import sinon from 'sinon';

import { attach, addRange, add } from '../../src';

import getRange from '../../src/vuex/get-range';

describe('Vuex.getRange(selector, listName, options)', () => {

    it('Should get a range for a computed property', () => {
        let state = attach();
        state = addRange(state, 'all', 0, 6, [ 1, 2, 3, 4, 5, 6, 7]);
        for (let i = 1; i <= 7; i++)
            state = add(state, i, { id: i });

        const dispatch = sinon.spy();
        const cmp = { $store: { state, dispatch } };

        const computed = getRange(
            () => ({ start: 0, end: 4 }),
            'all'
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 5);
        assert(!dispatch.called, 'dispatch not called');
    });

    it('Should get an exact range for a computed property', () => {
        let state = attach();
        state = addRange(state, 'all', 0, 4, [ 1, 2, 3, 4, 5 ]);
        for (let i = 1; i <= 5; i++)
            state = add(state, i, { id: i });

        const dispatch = sinon.spy();
        const cmp = { $store: { state, dispatch } };

        const computed = getRange(
            () => ({ start: 0, end: 4 }),
            'all'
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 5);
        assert(!dispatch.called, 'dispatch not called');
    });

    it('Should fetch data when missing', () => {
        let state = attach();

        const dispatch = sinon.spy().withArgs('fetchRange', {
            listName: 'all',
            start: 0,
            end: 9
        });

        const cmp = { $store: { state, dispatch } };

        const computed = getRange(
            () => ({ start: 0, end: 9 }),
            'all'
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 0);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should default to first 10 results', () => {
        let state = attach();

        const dispatch = sinon.spy().withArgs('fetchRange', {
            listName: 'all',
            start: 0,
            end: 9
        });

        const cmp = { $store: { state, dispatch } };

        const computed = getRange(
            () => null,
            'all'
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 0);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should support namespaces', () => {
        let state = attach();

        const dispatch = sinon.spy().withArgs('tests/fetchRange', {
            listName: 'all',
            start: 0,
            end: 9
        });

        const cmp = { $store: { state, dispatch } };

        const computed = getRange(
            () => null,
            'all',
            { namespace: 'tests' }
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 0);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should get meta (start, end, listName, params) from component', () => {
        let state = attach();

        const dispatch = sinon.spy().withArgs('fetchRange', {
            listName: 'tests',
            start: 2,
            end: 5,
            test: true
        });

        const cmp = {
            range: { start: 2, end: 5 },
            $store: { state, dispatch }
        };

        const computed = getRange(
            'range',
            () => 'tests',
            { params: () => ({ test: true }) }
        );

        const result = computed.call(cmp);

        assert.equal(result.length, 0);
        assert(dispatch.calledOnce, 'dispatch called');
    });

});
