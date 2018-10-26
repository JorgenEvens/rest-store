import assert from 'assert';

import { attach, options } from '../../src';
import getOption from '../../src/vuex/get-option';

import { makeStore } from './util';

describe('Vuex.getOption(listName, option, options)', () => {

    it('Should return undefined when list / option is missing', () => {
        const cmp = { $store: makeStore() };

        const value = getOption('all').call(cmp);
        assert.equal(typeof value, 'undefined');
    });

    it('Should get correct option value', () => {
        let state = attach();
        state = options(state, 'all', { hello: 'world' });

        const cmp = { $store: makeStore({ state }) };

        const value = getOption('all', 'hello').call(cmp);
        assert.strictEqual(value, 'world');
    });

    it('Should get correct value when namespaced', () => {
        let state = attach();
        state = options(state, 'all', { hello: 'world' });

        // Move state into namespace
        state = { testspace: state };

        const cmp = { $store: makeStore({ state }) };
        const value = getOption('all', 'hello', { namespace: 'testspace' }).call(cmp);
        assert.strictEqual(value, 'world');
    });

    it('Should return undefined when in wrong namespace', () => {
        let state = attach();
        state = options(state, 'all', { hello: 'world' });

        // Move state into namespace
        state = { otherspace: state };

        const cmp = { $store: makeStore({ state }) };
        const value = getOption('all', 'hello', { namespace: 'testspace' }).call(cmp);
        assert.equal(typeof value, 'undefined');
    });

});
