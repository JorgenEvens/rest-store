import assert from 'assert';

import removePage from '../../src/list/remove-page';

describe('# removePage()', () => {

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

    it('Should remove page with values at start', () => {
        const state = removePage(fixt_state, 'all', 1);

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

    it('Should remove page with values at end', () => {
        const state = removePage(fixt_state, 'all', 2);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
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
            null,
            null,
            null,
            null,
            null
        ]);
    });

});
