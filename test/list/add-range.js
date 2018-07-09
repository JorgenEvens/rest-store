import assert from 'assert';

import addRange from '../../src/list/add-range';

describe('# addRange()', () => {

    it('Should set initial range', () => {
        const fixt_ids = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        const state = addRange({}, 'all', 0, 9, fixt_ids);

        assert.equal(state.list.all.entries.length, 10);

        state.list.all.entries.forEach((entry, idx) => {
            assert.equal(entry.id, idx);
        });
    });

    it('Should set non-start range', () => {
        const fixt_ids = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        const state = addRange({}, 'all', 10, 19, fixt_ids);

        assert.equal(state.list.all.entries.length, 20);

        state.list.all.entries.forEach((entry, idx) => {
            if (idx < 10)
                assert.equal(entry, null);
            else
                assert.equal(entry.id, idx - 10);
        });
    });

    it('Should set partial range', () => {
        const fixt_ids = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        const state = addRange({}, 'all', 10, 24, fixt_ids);

        assert.equal(state.list.all.entries.length, 25);

        state.list.all.entries.forEach((entry, idx) => {
            if (idx < 10 || idx > 19)
                assert.equal(entry, null);
            else
                assert.equal(entry.id, idx - 10);
        });
    });

});
