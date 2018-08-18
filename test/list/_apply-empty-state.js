import assert from 'assert';

import _applyEmptyState from '../../src/list/_apply-empty-state';

describe('# _applyEmptyState(root, listName, options)', () => {

    it('Should correctly apply state on lists with total=0', () => {
        const root = {
            list: {
                test: {
                    total: 0,
                    hash: 123456,
                    entries: []
                }
            }
        };

        const state = _applyEmptyState(root, 'test', {
            state: 'ok'
        });

        assert.equal(state.list.test.state, 'ok');
    });

    it('Should not apply state on lists with total > 0', () => {
        const root = {
            list: {
                test: {
                    total: 1,
                    hash: 123456,
                    entries: []
                }
            }
        };

        const state = _applyEmptyState(root, 'test', {
            state: 'ok'
        });

        assert.notEqual(state.list.test.state, 'ok');
    });

    it('Should not touch lists with unknown total', () => {
        const state = _applyEmptyState(null, 'test', {
            state: 'ok'
        });

        assert.strictEqual(state, null);
    });

    it('Should not touch lists with unknown total', () => {
        const root = {};

        const state = _applyEmptyState(root, 'test', {
            state: 'ok'
        });

        assert.strictEqual(state, root);
    });

});
