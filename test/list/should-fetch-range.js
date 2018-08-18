import assert from 'assert';

import add from '../../src/resource/add';
import options from '../../src/list/options';
import addRange from '../../src/list/add-range';
import loadingRange from '../../src/list/loading-range';
import expireAll from '../../src/list/expire-all';
import addPage from '../../src/list/add-page';

import shouldFetchRange from '../../src/list/should-fetch-range';

describe('# shouldFetchRange(root, list, start, end)', () => {

    it('Should detect if a fetch is required', () => {
        let state = add(null, 0, { id: 0 });
        state = add(state, 1, { id: 1 });
        state = add(state, 2, { id: 2 });
        state = add(state, 3, { id: 3 });

        state = addRange(state, 'all', 0, 3, [ 0, 1, 2, 3 ]);
        state = addRange(state, 'all', 1, 1, [ 1 ], { expires: 100 });

        const fetch = shouldFetchRange(state, 'all', 0, 3);

        assert.equal(fetch, true);
    });

    it('Should detect if a fetch is required', () => {
        let state = add(null, 0, { id: 0 });
        state = add(state, 1, { id: 1 });
        state = add(state, 2, { id: 2 });
        state = add(state, 3, { id: 3 });

        state = addRange(state, 'all', 0, 3, [ 0, 1, 2, 3 ]);

        const fetch = shouldFetchRange(state, 'all', 0, 3);

        assert.equal(fetch, false);
    });

    it('Should detect a fetch for invalid pages', () => {
        let state = add(null, 0, { id: 0 });
        state = options(state, { total: 4 });

        // Calls like this should include pageSize as option
        state = addPage(state, 'all', 1, [ 0 ]);

        const fetch = shouldFetchRange(state, 'all', 0, 3);
        assert.equal(fetch, true);
    });

    it('Should not refresh items in loading state', () => {
        let state = loadingRange({}, 'all', 0, 3);

        const fetch = shouldFetchRange(state, 'all', 0, 3);

        assert.equal(fetch, false);
    });

    it('Should detect empty list is ok', () => {
        const root = {
            list: {
                all: {
                    total: 0,
                    entries: []
                }
            }
        };

        const fetch = shouldFetchRange(root, 'all', 0, 3);

        assert.equal(fetch, false);
    });

    it('Should detect empty list has expired', () => {
        const root = {
            list: {
                all: {
                    total: 0,
                    entries: []
                }
            }
        };

        let state = expireAll(root, 'all');

        const fetch = shouldFetchRange(state, 'all', 0, 3);

        assert.equal(fetch, true);
    });
});
