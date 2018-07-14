import assert from 'assert';

import _pageSize from '../../src/list/_page-size';

describe('# _pageSize(list, opts)', () => {

    it('Should return pageSize from opts', () => {
        const page = _pageSize({ pageSize: 9 }, { pageSize: 12 });

        assert.equal(page, 12);
    });

    it('Should return pageSize from list', () => {
        const page = _pageSize({ pageSize: 9 }, { });

        assert.equal(page, 9);
    });

    it('Should return pageSize from list', () => {
        const page = _pageSize({ pageSize: 9 }, null);

        assert.equal(page, 9);
    });

    it('Should return default pageSize', () => {
        const page = _pageSize(null, null);

        assert.equal(page, 10);
    });

});
