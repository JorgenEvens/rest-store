import assert from 'assert';

import { LOADING } from '../../src/constants';
import loadingPage from '../../src/list/loading-page';

describe('# loadingPage()', () => {

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

    it('Should loading page with values at start', () => {
        const state = loadingPage(fixt_state, 'all', 1);

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

    it('Should loading page with values at end', () => {
        const state = loadingPage(fixt_state, 'all', 2);

        assert.equal(state.list.all.entries.length, 20);

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
            { id: 5, state: LOADING },
            { id: 6, state: LOADING },
            { id: 7, state: LOADING },
            { id: 8, state: LOADING },
            { id: 9, state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING },
            { state: LOADING }
        ]);
    });

});
