import { expect as _expect } from 'chai';
import add from "../src/add.js";
const expect = _expect;

describe('Add two numbers', () => {
    it('Positive numbers', () => {
        let res = add(1, 2);
        expect(res).to.be.a('number');
        expect(res).to.equal(3);
    });
    it('Negative numbers', () => {
        let res = add(-1, -2);
        expect(res).to.be.a('number');
        expect(res).to.equal(-3);
    });
    it('Zeros', () => {
        let res = add(0, 0);
        expect(res).to.be.a('number');
        expect(res).to.equal(0);
    });
    it('Not numbers', () => {
        let res = add('not a number', 'not a number');
        expect(res).to.be.a('number');
        expect(res).to.equal(0);
    });
})
