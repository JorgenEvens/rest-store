import assert from 'assert';
import sinon from 'sinon';

import throttleAll from '../../src/vuex/throttle-all';

describe('Vuex.throttleAll(obj)', () => {

    it('Should limit the times a method can be called', () => {
        const obj = {
            test: sinon.spy()
        };

        const target = throttleAll(obj);

        target.test();
        target.test();
        target.test();

        assert.equal(obj.test.callCount, 1);
    });

    it('Should limit the times a method can be called with the same args', () => {
        const obj = {
            test: sinon.spy()
        };

        const target = throttleAll(obj);

        target.test({}, 1);
        target.test({}, 2);
        target.test({}, 1);

        assert.equal(obj.test.callCount, 2);
    });

});
