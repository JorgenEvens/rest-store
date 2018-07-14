import assert from 'assert';

import _page from '../../src/list/_page';

describe('# _page(list, page, opts)', () => {

    const fixt_opts = { pageSize: 12 };
    const fixt_list = { pageSize: 9 };

    it('Should return page options from opts', () => {
        const { start, end, pageSize } = _page(fixt_list, 1, fixt_opts);

        assert.equal(start, 0);
        assert.equal(end, 11);
        assert.equal(pageSize, 12);
    });

    it('Should return pageSize from list', () => {
        const { start, end, pageSize } = _page(fixt_list, 1);

        assert.equal(start, 0);
        assert.equal(end, 8);
        assert.equal(pageSize, 9);
    });

    it('Should return pageSize from list', () => {
        const { start, end, pageSize } = _page(fixt_list, 1, null);

        assert.equal(start, 0);
        assert.equal(end, 8);
        assert.equal(pageSize, 9);
    });

    it('Should return default pageSize', () => {
        const { start, end, pageSize } = _page(null, 1, null);

        assert.equal(start, 0);
        assert.equal(end, 9);
        assert.equal(pageSize, 10);
    });

});
