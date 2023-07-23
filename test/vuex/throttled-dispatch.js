import assert from 'assert';
import sinon from 'sinon';

import { wrapDispatch } from '../../src/utils/throttled-dispatch';

const sleep = (ttl) => new Promise(resolve => setTimeout(resolve, ttl));

describe('Vuex._throttledDispatch()', () => {

    it('Should limit the times an action can be called', () => {
        const dispatch = sinon.spy();
        const wrapped = wrapDispatch(dispatch);

        wrapped('test');
        assert.equal(dispatch.callCount, 1);

        wrapped('test');
        wrapped('test');
        wrapped('test');
        assert.equal(dispatch.callCount, 1);
    });

    it('Should limit the times an action can be called with the same args', () => {
        const dispatch = sinon.spy();
        const wrapped = wrapDispatch(dispatch);

        wrapped('test', { hello: 'world' });
        assert.equal(dispatch.callCount, 1);

        wrapped('test', { hello: 'world' });
        wrapped('test', { hello: 'world' });
        wrapped('test', { hello: 'world' });
        assert.equal(dispatch.callCount, 1);
    });

    it('Should call the method multiple times with different arguments', () => {
        const dispatch = sinon.spy();
        const wrapped = wrapDispatch(dispatch);

        wrapped('test', { hello: 'world' });
        assert.equal(dispatch.callCount, 1);

        wrapped('test', { hello: 'planet' });
        wrapped('test', { hello: 'world' });
        wrapped('test', { hello: 'world' });
        assert.equal(dispatch.callCount, 2);
    });

    it('Should return the same wrapper for the same dispatch method', () => {
        const dispatch = sinon.spy();
        const wrapped1 = wrapDispatch(dispatch);
        const wrapped2 = wrapDispatch(dispatch);

        assert.strictEqual(wrapped1, wrapped2);
    });

    it('Should return different wrappers for different dispatch methods', () => {
        const dispatch1 = sinon.spy();
        const dispatch2 = sinon.spy();
        const wrapped1 = wrapDispatch(dispatch1);
        const wrapped2 = wrapDispatch(dispatch2);

        assert.notStrictEqual(wrapped1, wrapped2);
    });

    it('Should only trigger once on multiple calls', async () => {
        const dispatch = sinon.spy();
        const wrapped = wrapDispatch(dispatch);

        wrapped('test', { hello: 'world' });
        wrapped('test', { hello: 'world' });
        assert.equal(dispatch.callCount, 1);

        await sleep(1050);

        assert.equal(dispatch.callCount, 1);
    });

    it('Should trigger more than once past the 10ms delay', async () => {
        const dispatch = sinon.spy();
        const wrapped = wrapDispatch(dispatch);

        wrapped('test', { hello: 'world' });
        wrapped('test', { hello: 'world' });
        assert.equal(dispatch.callCount, 1);

        await sleep(30);
        wrapped('test', { hello: 'world' });
        wrapped('test', { hello: 'world' });

        assert.equal(dispatch.callCount, 1);

        await sleep(1050);
        assert.equal(dispatch.callCount, 2);
    });

});
