import { expect as _expect } from "chai";
import filter from "../src/filter.js";
const expect = _expect;

const users = [
  { user: "barney", active: true },
  { user: "fred", active: false },
];

const products = [
    { name: "apple", price: 2 },
    { name: "orange", price: 3 },
    { name: "pear", price: 4 },
    { name: "banana", price: 5 },
    { name: "pineapple", price: 6 },
];

describe("General filter", () => {
  it("Filter array", () => {
    let res = filter(users, ({ active }) => active);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([{ user: "barney", active: true }]);
  });
  it("Filter array with 0 matches", () => {
    let res = filter(users, ({ user }) => user === "not a user");
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([[]]);
  });
  it("Filter empty array", () => {
    let res = filter([], ({ active }) => active);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([[]]);
  });
  it("Try to filter object", () => {
    let res = filter({ a: 1, b: 2 }, ({ active }) => active);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([[]]);
  });
  it("Try to filter null", () => {
    let res = filter(null, ({ active }) => active);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([[]]);
  });
  it("Should not modify original array", () => {
    let res = filter(users, ({ active }) => active);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([{ user: "barney", active: true }]);
    expect(users).to.deep.equal([
      { user: "barney", active: true },
      { user: "fred", active: false },
    ]);
  });
});

describe("Filter products", () => {
    it("Filter products with price over 4", () => {
        let res = filter(products, ({ price }) => price > 4);
        expect(res).to.be.a("array");
        expect(res).to.deep.equal([
            { name: "banana", price: 5 },
            { name: "pineapple", price: 6 },
        ]);
    });
    it("Filter products with price over 10", () => {
        let res = filter(products, ({ price }) => price > 10);
        expect(res).to.be.a("array");
        expect(res).to.deep.equal([[]]);
    });
    it("Filter products with p in name", () => {
        let res = filter(products, ({ name }) => name.includes("p"));
        expect(res).to.be.a("array");
        expect(res).to.deep.equal([
            { name: "apple", price: 2 },
            { name: "pear", price: 4 },
            { name: "pineapple", price: 6 },
        ]);
    });
    it("Filter products with x in name", () => {
        let res = filter(products, ({ name }) => name.includes("x"));
        expect(res).to.be.a("array");
        expect(res).to.deep.equal([[]]);
    });
    it("Filter products with price over 4 and name includes p", () => {
        let res = filter(products, ({ name, price }) => name.includes("p") && price > 4);
        expect(res).to.be.a("array");
        expect(res).to.deep.equal([
            { name: "pineapple", price: 6 },
        ]);
    });
});
