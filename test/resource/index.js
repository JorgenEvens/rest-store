import assert from 'assert';

import resource from '../../src/resource';

describe('# resource(root, id)', () => {

    const fixt_obj1 = { id: 1 };
    const fixt_obj2 = { id: 2 };
    const fixt_state = {
        resources: {
            obj1: {
                data: fixt_obj1
            },
            2: {
                data: fixt_obj2
            },
        }
    };

    it('Should retrieve the specified resource', () => {
        const obj1 = resource(fixt_state, 'obj1');
        assert.equal(obj1, fixt_obj1);

        const obj2 = resource(fixt_state, 2);
        assert.equal(obj2, fixt_obj2);

        const obj2_string = resource(fixt_state, '2');
        assert.equal(obj2_string, fixt_obj2);
    });

    it('Should return null for missing resources', () => {
        const obj1 = resource(fixt_state, 'obj3');
        assert.equal(obj1, null);
    });

});
