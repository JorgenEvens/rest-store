import assert from 'assert';

import { ENTRY, OK, EXPIRED } from '../../src/constants';
import range from '../../src/list/range';
import isOK from '../../src/status/is-ok';

describe('# range(root, list, start, end)', () => {

    const fixt_state = {
        resources: {
            1: { data: { id: 1 } },
            2: { data: { id: 2 } },
            3: { data: { id: 3 } },
            4: { data: { id: 4 } },
            5: { data: { id: 5 } },
            6: { data: { id: 6 } },
            7: { data: { id: 7 } },
            8: { data: { id: 8 } },
            9: { data: { id: 9 } },
            10: { data: { id: 10 } },
            11: { data: { id: 11 } },
            12: { data: { id: 12 } },
            13: { data: { id: 13 } },
        },
        list: {
            all: {
                total: 13,
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
            totalZero: {
                total: 0,
                entries: []
            },
            entryless: {
                total: 50
            }
        }
    };

    it('Should return a page from the specified list', () => {
        const result = range(fixt_state, 'all', 0, 9);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 10, 'result has correct length');

        result.forEach((res, id) => {
            assert.notStrictEqual(res, null, 'an object was returned');
            assert.equal(res.id, id + 1, 'correct object selected');
        });
    });

    it('Should return only up to the total amount of entries', () => {
        const result = range(fixt_state, 'all', 10, 19);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 3, 'result has correct length');

        result.forEach((res, id) => {
            assert.notStrictEqual(res, null, 'an object was returned');
            assert.equal(res.id, id + 11, 'correct object selected');
        });
    });

    it('Should fill out range for parts that have not been fetched', () => {
        const result = range(fixt_state, 'total', 0, 9);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 10, 'result has correct length');

        assert.deepEqual(result, [
            { id: 1 }, { id: 2 }, { id: 3 }, null, null, null, null, null, null, null
        ]);
    });

    it('Should return an empty array for invalid list', () => {
        let result;

        result = range(fixt_state, 'does-not-exist', 10, 19);
        assert.deepEqual(result, [
            null, null, null, null, null,
            null, null, null, null, null
        ]);

        result = range(fixt_state, 'entryless', 10, 19);
        assert.deepEqual(result, [
            null, null, null, null, null,
            null, null, null, null, null
        ]);

        result = range(fixt_state, 'total', 100, 109);
        assert.deepEqual(result, []);
    });

    it('Should set valid ENTRY for lists with total=0', () => {
        const result = range(fixt_state, 'totalZero', 10, 19);
        assert.equal(result.length, 0);
        assert(result[ENTRY]);

        assert(Array.isArray(result[ENTRY].entries), 'entries is an array');
        assert.equal(result[ENTRY].total, 0);
    });

    it('Should verify resource status', () => {
        const state = {
            resources: {
                1: { data: { id: 1 }, state: OK },
                2: { data: { id: 2 }, state: EXPIRED }
            },
            list: {
                all: {
                    total: 10,
                    entries: [
                        { id: 1, state: OK },
                        { id: 2, state: OK }
                    ]
                }
            }
        };

        const result = range(state, 'all', 0, 1);
        assert.deepEqual(result, [
            { id: 1 },
            { id: 2 }
        ]);

        assert(!isOK(result), 'List is not in OK state');
    });
});
