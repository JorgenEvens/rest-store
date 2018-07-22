import assert from 'assert';

import add from '../../src/resource/add';
import options from '../../src/list/options';
import addRange from '../../src/list/add-range';

import shouldFetchPage from '../../src/list/should-fetch-page';

describe('# shouldFetchPage(root, list, page, opts)', () => {

    it('Should detect if a fetch is required', () => {
        let state = add(null, 0, { id: 0 });
        state = add(state, 1, { id: 1 });
        state = add(state, 2, { id: 2 });
        state = add(state, 3, { id: 3 });

        state = addRange(state, 'all', 0, 3, [ 0, 1, 2, 3 ]);
        state = addRange(state, 'all', 1, 1, [ 1 ], { expires: 100 });

        const fetch = shouldFetchPage(state, 'all', 1);

        assert.equal(fetch, true);
    });

    it('Should detect if a fetch is required', () => {
        let state = add(null, 0, { id: 0 });
        state = add(state, 1, { id: 1 });
        state = add(state, 2, { id: 2 });
        state = add(state, 3, { id: 3 });
        state = options(state, 'all', { total: 4 });

        state = addRange(state, 'all', 0, 3, [ 0, 1, 2, 3 ]);

        const fetch = shouldFetchPage(state, 'all', 1);

        assert.equal(fetch, false);
    });

    it('Should detect if a fetch is required', () => {
        let state = null;

        const fetch = shouldFetchPage(state, 'all', 1);

        assert(fetch, 'should fetch');
    });
});
