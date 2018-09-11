import assert from 'assert';
import sinon from 'sinon';

import throttleAll from '../../src/vuex/throttle-all';

describe('Vuex.throttleAll(obj)', () => {

    it('Should warn user about usage', () => {
        const obj = {};
        const spy = sinon.stub(console, 'warn');

        throttleAll(obj);
        throttleAll(obj);

        assert.equal(spy.callCount, 1);
    });

});
