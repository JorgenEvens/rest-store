import assert from 'assert';

import add from '../../src/resource/add';
import { OK } from '../../src/constants';

describe('# add(root, list, start, end)', () => {

    const fixt_obj1 = { id: 1 };
    const fixt_state = {
        resources: {},
        list: {
            all: {
                pageSize: 10,
                entries: [
                    { id: '1' }
                ]
            },
            total: {
                pageSize: 10,
                total: 200,
                entries: []
            }
        }
    };

    it('Should add resource to state', () => {
        const next = add(fixt_state, 1, fixt_obj1);
        const res = next.resources[1];
        const TTL = Date.now() + (60 * 1000);

        assert.deepStrictEqual(res.data, fixt_obj1);
        assert(res.expires >= TTL - 5 && res.expires <= TTL + 5, 'expires is set correctly');
        assert.strictEqual(res.state, OK);
    });

    it('Should initialize empty state', () => {
        const next = add(null, 1, fixt_obj1);
        const res = next.resources[1];
        const TTL = Date.now() + (60 * 1000);

        assert.deepStrictEqual(res.data, fixt_obj1);
        assert(res.expires >= TTL - 5 && res.expires <= TTL + 5, 'expires is set correctly');
        assert.strictEqual(res.state, OK);
    });

});
