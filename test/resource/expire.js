import assert from 'assert';
import sinon from 'sinon';

import expire from '../../src/resource/expire';
import { EXPIRED } from '../../src/constants';

describe('# expire(root, id)', () => {

    let sandbox = null;

    const fixt_obj1 = { id: 1 };
    const fixt_state = {
        resources: {
            1: {
                id: 1,
                data: fixt_obj1
            }
        }
    };

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Should expire resource', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const next = expire(fixt_state, 1);
        const res = next.resources[1];

        assert.deepStrictEqual(res.data, fixt_obj1);
        assert.equal(res.expires, 999, 'expires is set correctly');
        assert.strictEqual(res.state, EXPIRED);
    });

    it('Should not initialize empty state', () => {
        sandbox.stub(Date, 'now').returns(1000);

        const next = expire(null, 1, fixt_obj1);
        const res = next.resources[1];

        assert.equal(typeof res, 'undefined');
    });

});
