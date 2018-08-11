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

    // https://vuex.vuejs.org/guide/modules.html#register-global-action-in-namespaced-modules
    it('Should support objects with handler method', () => {
        const obj = {
            test: {
                root: true,
                handler: sinon.spy()
            }
        };

        const target = throttleAll(obj);

        assert.equal(typeof target.test, 'object');
        assert.equal(typeof target.test.handler, 'function');

        const a = 'a';
        const b = 'b';

        target.test.handler({}, { a, b });
        target.test.handler({}, { b, a });

        assert.equal(obj.test.handler.callCount, 1);
    });

    it('Should not touch unsupported properties', () => {
        const obj = { prop: {} };

        const target = throttleAll(obj);

        assert.strictEqual(obj.prop, target.prop);
        assert.equal(typeof obj.prop, 'object');
        assert.equal(typeof obj.prop.handler, 'undefined');
    });

});
