import assert from 'assert';

import page from '../../src/list/page';

describe('# page(root, list, page, opts)', () => {

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
                pageSize: 10,
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
        const result = page(fixt_state, 'all', 1);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 10, 'result has correct length');

        result.forEach((res, id) => {
            assert.notStrictEqual(res, null, 'an object was returned');
            assert.equal(res.id, id + 1, 'correct object selected');
        });
    });

    it('Should return an empty page when ids are missing', () => {
        const result = page(fixt_state, 'all', 11);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 0, 'result has correct length');

        assert.deepEqual(result, []);
    });

    it('Should return a partial page', () => {
        const result = page(fixt_state, 'all', 2);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 3, 'result has correct length');

        result.forEach((res, id) => {
            assert.notStrictEqual(res, null, 'an object was returned');
            assert.equal(res.id, id + 11, 'correct object selected');
        });
    });

    it('Should return a partial page when ids are missing', () => {
        const result = page(fixt_state, 'total', 1);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 10, 'result has correct length');

        assert.deepEqual(result, [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            null, null, null, null, null, null, null
        ]);
    });

    it('Should should allow custom page sizes', () => {
        const result = page(fixt_state, 'total', 1, { pageSize: 5 });

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 5, 'result has correct length');

        assert.deepEqual(result, [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            null,
            null
        ]);
    });

    it('Should return empty when list does not exist', () => {
        const result = page(fixt_state, 'does-not-exist', 1);

        assert(Array.isArray(result), 'is an array');
        assert.equal(result.length, 0, 'result has correct length');

        assert.deepEqual(result, []);
    });
});
