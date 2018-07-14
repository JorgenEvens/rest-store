import assert from 'assert';

import removeRange from '../../src/list/remove-range';

describe('# removeRange()', () => {

    const fixt_state = {
        list: {
            all: {
                entries: [
                    null,
                    null,
                    null,
                    null,
                    null,
                    { id: 0 },
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                    { id: 4 },
                    { id: 5 },
                    { id: 6 },
                    { id: 7 },
                    { id: 8 },
                    { id: 9 }
                ]
            }
        }
    };

    it('Should remove range with values at start', () => {
        const state = removeRange(fixt_state, 'all', 0, 9);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 }
        ]);
    });

    it('Should remove range with values at end', () => {
        const state = removeRange(fixt_state, 'all', 5, 14);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]);
    });

    it('Should set defaults on empty lists', () => {
        const state = removeRange({ list: {} }, 'all', 5, 14);

        assert.equal(state.list.all.entries.length, 0);
    });

    it('Should set defaults on empty state', () => {
        const state = removeRange(null, 'all', 5, 14);

        assert.equal(state.list.all.entries.length, 0);
    });

});
