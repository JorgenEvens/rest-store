import assert from 'assert';

import get from '../../src/resource';
import add from '../../src/resource/add';
import loading from '../../src/resource/loading';

import isLoading from '../../src/status/is-loading';

describe('# is-loading', () => {

    it('Should detect loading state', () => {
        const state = loading(null, 1);
        const res = get(state, 1);

        assert(isLoading(res), 'resource is loading');
    });

    it('Should detect non-loading state', () => {
        const state = add(null, 1, {});
        const res = get(state, 1);

        assert(!isLoading(res), 'resource is not loading');
    });

});
