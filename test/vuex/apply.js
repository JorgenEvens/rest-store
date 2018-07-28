import sinon from 'sinon';
import assert from 'assert';

import apply from '../../src/vuex/apply';

describe('Vuex.apply(action, state, ...args)', () => {

    it('Should apply state returned by action', () => {
        const action = sinon.stub().returns({ a: 'b' });
        const state = { a: 'c' };

        const next = apply(action, state);

        assert.strictEqual(next, state);
        assert.equal(state.a, 'b');
    });

    it('Should pass arguments to action', () => {
        const state = { a: 'c' };
        const action = sinon.stub()
            .withArgs(state, 'a', 'b')
            .returns({ a: 'b' });

        const next = apply(action, state);

        assert(action.calledOnce, 'action called');
        assert.strictEqual(next, state);
        assert.equal(state.a, 'b');
    });

    it('Should create new state', () => {
        const action = sinon.stub().returns({});
        const next = apply(action, null);

        assert.notEqual(next, null);
    });

});
