import assert from 'assert';

import get from '../../src/resource';
import add from '../../src/resource/add';
import loading from '../../src/resource/loading';

import isViewable from '../../src/status/is-viewable';

describe('# is-viewable', () => {

    it('Should detect non-viewable state', () => {
        const state = loading(null, 1);
        const res = get(state, 1);

        assert(!isViewable(res), 'resource is not viewable');
    });

    it('Should detect viewable state', () => {
        const state = add(null, 1, {});
        const res = get(state, 1);

        assert(isViewable(res), 'resource is viewable');
    });

    it('Should detect viewable state', () => {
        let state = null;
        state = add(state, 1, {});
        state = loading(state, 1);

        const res = get(state, 1);

        assert(isViewable(res), 'resource is viewable');
    });

});
