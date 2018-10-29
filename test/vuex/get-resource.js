import assert from 'assert';
import sinon from 'sinon';

import { add, attach } from '../../src';

import getResource from '../../src/vuex/get-resource';

import { makeStore } from './util';

describe('Vuex.getResource(selector, options)', () => {

    it('Should get a resource for a computed property', () => {
        const state = add({}, 2, { id: 2 });
        const dispatch = sinon.spy();
        const cmp = {
            $store: makeStore({ state, dispatch }),
            resourceId: '2'
        };

        const computed = getResource('resourceId');
        const result = computed.call(cmp);

        assert.equal(result.id, 2);
        assert(!dispatch.called, 'dispatch not called');
    });

    it('Should fetch data when missing', () => {
        const state = attach();
        const dispatch = sinon.spy().withArgs('fetch', { id: 2 });
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getResource(() => 2);
        const result = computed.call(cmp);

        assert.strictEqual(result, null);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should return placeholder value when missing', () => {
        const state = attach();
        const dispatch = sinon.spy().withArgs('fetch', { id: 2 });
        const cmp = { $store: makeStore({ state, dispatch }) };
        const placeholder = { hello: 'test' };

        const computed = getResource(() => 2, { placeholder });
        const result = computed.call(cmp);

        assert.strictEqual(result, placeholder);
        assert.equal(result.hello, 'test');
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should support namespaces', () => {
        const state = attach();
        const dispatch = sinon.spy().withArgs('tests/fetch', { id: 2 });
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getResource(() => 2, { namespace: 'tests' });
        const result = computed.call(cmp);

        assert.strictEqual(result, null);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should support selector callback', () => {
        const state = add({}, 2, { id: 2 });
        const dispatch = sinon.spy();
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getResource(() => 2);
        const result = computed.call(cmp);

        assert.equal(result.id, 2);
        assert(!dispatch.called, 'dispatch not called');
    });

    it('Should support parameters', () => {
        const state = attach();
        const dispatch = sinon.spy().withArgs('fetch', { id: 2, a: 'test' });
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getResource(() => 2, { params: { a: 'test' } });
        computed.call(cmp);

        assert(dispatch.called, 'dispatch called');
    });

    it('Should support parameter callback', () => {
        const state = attach();
        const dispatch = sinon.spy().withArgs('fetch', { id: 2, a: 'test' });
        const cmp = {
            $store: makeStore({ state, dispatch }),
            propA: 'test'
        };

        const computed = getResource(() => 2, { params: () => ({ a: cmp.propA }) });
        computed.call(cmp);

        assert(dispatch.called, 'dispatch called');
    });

    it('Should not fetch if condition evaluates to false', () => {
        let state = attach();
        const dispatch = sinon.spy();
        const condition = sinon.stub().returns(false);
        const cmp = { $store: makeStore({ state, dispatch }) };

        const computed = getResource(
            () => 1,
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

        const computed = getResource(
            () => 1,
            { condition }
        );

        computed.call(cmp);

        assert.equal(dispatch.callCount, 1, 'action dispatched');
        assert.equal(condition.callCount, 1, 'condition called');
    });

});
