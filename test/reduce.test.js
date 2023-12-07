import { expect as _expect } from "chai";
import reduce from "../src/reduce.js";
const expect = _expect;

describe("General reduce", () => {
  it("Reduce array with initial value", () => {
    let res = reduce([1, 2], (sum, n) => sum + n, 3);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });
  it("Reduce object with initial value", () => {
    let res = reduce(
      { a: 1, b: 2, c: 1 },
      (result, value, key) => {
        (result[value] || (result[value] = [])).push(key);
        return result;
      },
      { 1: ["d"] }
    );
    expect(res).to.be.a("object");
    expect(res).to.deep.equal({ 1: ["d", "a", "c"], 2: ["b"] });
  });
  it("Reduce array with no initial value", () => {
    let res = reduce([1, 2], (sum, n) => sum + n);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(3);
  });
  it("Reduce object with no initial value", () => {
    let res = reduce({ a: 1, b: 2, c: 1 }, (result, value, key) => {
      (result[value] || (result[value] = [])).push(key);
      return result;
    });
    expect(res).to.be.a("object");
    expect(res).to.deep.equal({ 1: ["a", "c"], 2: ["b"] });
  });
  it("Reduce empty array", () => {
    let res = reduce([], (sum, n) => sum + n, 0);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(0);
  });
  it("Reduce empty object", () => {
    let res = reduce(
      {},
      (result, value, key) => {
        (result[value] || (result[value] = [])).push(key);
        return result;
      },
      {}
    );
    expect(res).to.be.a("object");
    expect(res).to.deep.equal({});
  });
});

describe("Shopping cart reduce", () => {
  it("Reduce shopping cart", () => {
    let res = reduce(
      [
        { item: "apple", price: 2 },
        { item: "orange", price: 3 },
        { item: "banana", price: 1 },
      ],
      (sum, n) => sum + n.price,
      0
    );
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });
  it("Reduce shopping cart with no initial value", () => {
    let res = reduce(
      [
        { item: "apple", price: 2 },
        { item: "orange", price: 3 },
        { item: "banana", price: 1 },
      ],
      (sum, n) => sum + n.price
    );
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });
  it("Reduce empty shopping cart", () => {
    let res = reduce([], (sum, n) => sum + n.price, 0);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(0);
  });
  it("Reduce shopping cart with missing price", () => {
    let res = reduce(
      [
        { item: "apple", price: 2 },
        { item: "orange" },
        { item: "banana", price: 1 },
      ],
      (sum, n) => sum + n.price,
      0
    );
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(NaN);
  });
});
