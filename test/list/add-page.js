import assert from 'assert';

import addPage from '../../src/list/add-page';

describe('# addPage()', () => {

    it('Should set initial page', () => {
        const fixt_ids = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        const state = addPage({}, 'all', 1, fixt_ids);

        assert.equal(state.list.all.entries.length, 10);

        state.list.all.entries.forEach((entry, idx) => {
            assert.equal(entry.id, idx);
        });
    });

    it('Should set second page first', () => {
        const fixt_ids = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        const state = addPage({}, 'all', 2, fixt_ids);

        assert.equal(state.list.all.entries.length, 20);

        state.list.all.entries.forEach((entry, idx) => {
            if (idx < 10)
                assert.equal(entry, null);
            else
                assert.equal(entry.id, idx - 10);
        });
    });

    it('Should add multiple pages', () => {
        const fixt_ids1 = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        const fixt_ids2 = [ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ];

        let state = {};
        state = addPage(state, 'all', 1, fixt_ids1);
        state = addPage(state, 'all', 3, fixt_ids2);

        assert.equal(state.list.all.entries.length, 30);

        state.list.all.entries.forEach((entry, idx) => {
            if (idx < 10)
                assert.equal(entry.id, idx);
            else if (idx > 19)
                assert.equal(entry.id, idx - 10);
            else
                assert.equal(entry, null);
        });
    });

});
