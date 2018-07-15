import assert from 'assert';

import add from '../../src/resource/add';
import addRange from '../../src/list/add-range';

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
});
