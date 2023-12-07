import { expect as _expect } from 'chai';
import reduce from "../src/reduce.js";
const expect = _expect;

describe('Reduce', () => {
    it('Reduce array', () => {
        let res = reduce([1, 2], (sum, n) => sum + n, 0);
        expect(res).to.be.a('number');
        expect(res).to.equal(3);
    });
    it('Reduce object', () => {
        let res = reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
            (result[value] || (result[value] = [])).push(key)
            return result
        }, {});
        expect(res).to.be.a('object');
        expect(res).to.eql({ '1': ['a', 'c'], '2': ['b'] });
    });
});