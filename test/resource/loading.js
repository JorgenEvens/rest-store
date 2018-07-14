import assert from 'assert';

import loading from '../../src/resource/loading';
import { LOADING } from '../../src/constants';

describe('# loading(root, id)', () => {

    const fixt_obj1 = { id: 1 };
    const fixt_state = {
        resources: {
            1: {
                id: 1,
                data: fixt_obj1
            }
        }
    };

    it('Should be loading resource', () => {
        const next = loading(fixt_state, 1);
        const res = next.resources[1];

        assert.deepStrictEqual(res.data, fixt_obj1);
        assert.strictEqual(res.state, LOADING);
    });

    it('Should initialize empty state', () => {
        const next = loading(null, 1);
        const res = next.resources[1];

        assert(!!res);
        assert.equal(res.state, LOADING);
    });

});
