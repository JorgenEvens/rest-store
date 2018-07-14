import assert from 'assert';
import sinon from 'sinon';

import add from '../../src/resource/add';
import { OK } from '../../src/constants';

describe('# add(root, id, resource)', () => {

    let sandbox = null;

    const fixt_obj1 = { id: 1 };
    const fixt_state = {
        resources: {}
    };

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should add resource to state', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const next = add(fixt_state, 1, fixt_obj1);
        const res = next.resources[1];
        const TTL = Date.now() + (60 * 1000);

        assert.deepEqual(res.data, fixt_obj1);
        assert.equal(res.expires, TTL, 'expires is set correctly');
        assert.strictEqual(res.state, OK);
    });

    it('Should use expires from opts', () => {
        const next = add(fixt_state, 1, fixt_obj1, { expires: 12 });
        const res = next.resources[1];

        assert.deepEqual(res.data, fixt_obj1);
        assert.equal(res.expires, 12, 'expires is set correctly');
        assert.strictEqual(res.state, OK);
    });

    it('Should use TTL from opts', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const next = add(fixt_state, 1, fixt_obj1, { ttl: 12 });
        const res = next.resources[1];

        assert.deepEqual(res.data, fixt_obj1);
        assert.equal(res.expires, 1012, 'expires is set correctly');
        assert.strictEqual(res.state, OK);
    });

    it('Should initialize empty state', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const next = add(null, 1, fixt_obj1);
        const res = next.resources[1];
        const TTL = Date.now() + (60 * 1000);

        assert.deepEqual(res.data, fixt_obj1);
        assert.equal(res.expires, TTL, 'expires is set correctly');
        assert.strictEqual(res.state, OK);
    });

});
