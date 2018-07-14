import assert from 'assert';

import remove from '../../src/resource/remove';

describe('# remove(root, id)', () => {

    const fixt_obj1 = { id: 1 };
    const fixt_state = {
        resources: {
            1: {
                id: 1,
                data: fixt_obj1
            }
        }
    };

    it('Should remove resource', () => {
        const next = remove(fixt_state, 1);
        const res = next.resources[1];

        assert.strictEqual(res, null);
    });

    it('Should not initialize empty state', () => {
        const next = remove(null, 1, fixt_obj1);
        const res = next.resources[1];

        assert.equal(typeof res, 'undefined');
    });

});
