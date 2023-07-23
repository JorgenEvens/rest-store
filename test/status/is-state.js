import assert from 'assert';

import isState from '../../src/status/is-state';
import { setEntry } from '../../src/utils/entry';
import { OK, ERROR, LOADING } from '../../src/constants';

describe('# is-state', () => {

    it('Should detect raw states', () => {
        assert(isState(OK, OK));
        assert(isState(ERROR, ERROR));
        assert(isState(LOADING, LOADING));
    });

    it('Should never match empty', () => {
        assert(!isState(null, OK));
        assert(!isState(null, ERROR));
        assert(!isState(null, LOADING));
    });

    it('Should read state from entry', () => {
        const fixt_resource = {};
        setEntry(fixt_resource, { state: OK });

        assert(isState(fixt_resource, OK));
    });

    it('Should read state from entry array', () => {
        const fixt_list = [
            { id: 1 },
            { id: 2 }
        ];

        setEntry(fixt_list, [
            { state: OK },
            { state: OK }
        ]);

        assert(isState(fixt_list, OK));
    });

});
