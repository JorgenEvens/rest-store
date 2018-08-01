import assert from 'assert';
import sinon from 'sinon';

import { add } from '../../src';

import getResource from '../../src/vuex/get-resource';

describe('Vuex.getResource(selector, options)', () => {

    it('Should get a resource for a computed property', () => {
        const state = add({}, 2, { id: 2 });
        const dispatch = sinon.spy();
        const cmp = {
            $store: { state, dispatch },
            resourceId: '2'
        };

        const computed = getResource('resourceId');
        const result = computed.call(cmp);

        assert.equal(result.id, 2);
        assert(!dispatch.called, 'dispatch not called');
    });

    it('Should fetch data when missing', () => {
        const dispatch = sinon.spy().withArgs('fetch', { id: 2 });
        const cmp = {
            $store: { state: {}, dispatch }
        };

        const computed = getResource(() => 2);
        const result = computed.call(cmp);

        assert.strictEqual(result, null);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should support namespaces', () => {
        const dispatch = sinon.spy().withArgs('tests/fetch', { id: 2 });
        const cmp = {
            $store: { state: {}, dispatch }
        };

        const computed = getResource(() => 2, { namespace: 'tests' });
        const result = computed.call(cmp);

        assert.strictEqual(result, null);
        assert(dispatch.calledOnce, 'dispatch called');
    });

    it('Should support selector callback', () => {
        const state = add({}, 2, { id: 2 });
        const dispatch = sinon.spy();
        const cmp = {
            $store: { state, dispatch }
        };

        const computed = getResource(() => 2);
        const result = computed.call(cmp);

        assert.equal(result.id, 2);
        assert(!dispatch.called, 'dispatch not called');
    });

    it('Should support parameters', () => {
        const dispatch = sinon.spy().withArgs('fetch', { id: 2, a: 'test' });
        const cmp = {
            $store: { state: {}, dispatch }
        };

        const computed = getResource(() => 2, { params: { a: 'test' } });
        computed.call(cmp);

        assert(dispatch.called, 'dispatch called');
    });

    it('Should support parameter callback', () => {
        const dispatch = sinon.spy().withArgs('fetch', { id: 2, a: 'test' });
        const cmp = {
            $store: { state: {}, dispatch },
            propA: 'test'
        };

        const computed = getResource(() => 2, { params: () => ({ a: cmp.propA }) });
        computed.call(cmp);

        assert(dispatch.called, 'dispatch called');
    });

});
