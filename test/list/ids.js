import assert from 'assert';

import ids from '../../src/list/ids';

describe('# ids(root, list, start, end)', () => {

    const fixt_state = {
        list: {
            all: {
                entries: [
                    { id: '1' },
                    { id: '2' },
                    { id: '3' },
                    { id: '4' },
                    { id: '5' },
                    { id: '6' },
                    { id: '7' },
                    { id: '8' },
                    { id: '9' },
                    { id: '10' },
                    { id: '11' },
                    { id: '12' },
                    { id: '13' }
                ]
            },
            total: {
                total: 100,
                entries: [
                    { id: '1' },
                    { id: '2' },
                    { id: '3' }
                ]
            },
            entryless: {
                total: 50
            }
        }
    };

    it('Should return a page from the specified list', () => {
        const result = ids(fixt_state, 'all', 0, 9);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 10, 'result has correct length');

        assert.deepStrictEqual(result, [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
        ]);
    });

    it('Should return only up to the total amount of entries', () => {
        const result = ids(fixt_state, 'all', 10, 19);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 3, 'result has correct length');

        assert.deepStrictEqual(result, [ '11', '12', '13' ]);
    });

    it('Should fill out ids for parts that have not been fetched', () => {
        const result = ids(fixt_state, 'total', 0, 9);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 10, 'result has correct length');

        assert.deepStrictEqual(result, [
            '1', '2', '3', null, null, null, null, null, null, null
        ]);
    });

    it('Should return an empty array for invalid list', () => {
        let result;

        result = ids(fixt_state, 'does-not-exist', 10, 19);
        assert.deepStrictEqual(result, []);

        result = ids(fixt_state, 'entryless', 10, 19);
        assert.deepStrictEqual(result, []);

        result = ids(fixt_state, 'total', 100, 109);
        assert.deepStrictEqual(result, []);
    });
});
