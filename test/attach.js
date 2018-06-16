import assert from 'assert';

import attach from '../src/attach';

describe('# attach(root)', () => {

    it('Should create state structure', () => {
        const next = attach({});

        assert.deepStrictEqual(next, {
            resources: {},
            list: {
                all: []
            }
        });
    });

    it('Should add state structure', () => {
        const next = attach({
            some: 'state'
        });

        assert.deepStrictEqual(next, {
            some: 'state',
            resources: {},
            list: {
                all: []
            }
        });
    });

    it('Should preserve existing state structure', () => {
        const next = attach({
            resources: {
                12: {
                    expire: 1000,
                    data: {}
                }
            }
        });

        assert.deepStrictEqual(next, {
            resources: {
                12: {
                    expire: 1000,
                    data: {}
                }
            },
            list: {
                all: []
            }
        });
    });
});
