import assert from 'assert';

import resources from '../../src/resource/list';

describe('# resources(root, ids)', () => {

    const fixt_obj1 = { id: 1 };
    const fixt_obj2 = { id: 2 };
    const fixt_state = {
        resources: {
            obj1: {
                data: fixt_obj1
            },
            2: {
                data: fixt_obj2
            },
        }
    };

    it('Should return an array of objects', () => {

        const result = resources(fixt_state, [ 'obj1', 2 ]);

        assert.deepStrictEqual(result, [ fixt_obj1, fixt_obj2 ]);
    });

    it('Should return duplicates on duplicate ID', () => {
        const result = resources(fixt_state, [ 'obj1', 2, 'obj1' ]);

        assert.deepStrictEqual(result, [ fixt_obj1, fixt_obj2, fixt_obj1 ]);
    });

    it('Should return null values for missing ids', () => {
        const result = resources(fixt_state, [ 'obj1', null, 'obj1' ]);

        assert.deepStrictEqual(result, [ fixt_obj1, null, fixt_obj1 ]);
    });

    it('Should return an empty array on invalid ids', () => {
        let result;

        result = resources(fixt_state, { key: 'value' });
        assert.deepStrictEqual(result, []);

        result = resources(fixt_state, null);
        assert.deepStrictEqual(result, []);

        result = resources(fixt_state, false);
        assert.deepStrictEqual(result, []);

        result = resources(fixt_state, 'obj1');
        assert.deepStrictEqual(result, []);

        result = resources(fixt_state, 2);
        assert.deepStrictEqual(result, []);
    });

});
