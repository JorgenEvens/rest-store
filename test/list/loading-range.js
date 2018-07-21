import assert from 'assert';

import { LOADING } from '../../src/constants';
import loadingRange from '../../src/list/loading-range';

describe('# loadingRange()', () => {

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

    it('Should be loading range with values at start', () => {
        const state = loadingRange(fixt_state, 'all', 0, 9);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { id: 0, state: LOADING },
            { id: 1, state: LOADING },
            { id: 2, state: LOADING },
            { id: 3, state: LOADING },
            { id: 4, state: LOADING },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 }
        ]);
    });

    it('Should be loading range with values at end', () => {
        const state = loadingRange(fixt_state, 'all', 5, 14);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            null,
            null,
            null,
            null,
            null,
            { id: 0, state: LOADING },
            { id: 1, state: LOADING },
            { id: 2, state: LOADING },
            { id: 3, state: LOADING },
            { id: 4, state: LOADING },
            { id: 5, state: LOADING },
            { id: 6, state: LOADING },
            { id: 7, state: LOADING },
            { id: 8, state: LOADING },
            { id: 9, state: LOADING }
        ]);
    });

    it('Should set defaults on empty lists', () => {
        const state = loadingRange({ list: {} }, 'all', 5, 14);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            null,
            null,
            null,
            null,
            null,
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING }
        ]);
    });

    it('Should set defaults on empty state', () => {
        const state = loadingRange(null, 'all', 5, 14);

        assert.equal(state.list.all.entries.length, 15);

        assert.deepEqual(state.list.all.entries, [
            null,
            null,
            null,
            null,
            null,
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING }
        ]);
    });

});
