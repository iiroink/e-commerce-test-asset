import { expect as _expect } from "chai";
import ceil from "../src/ceil.js";
const expect = _expect;

const products = [
  { name: "apple", price: 2.1234 },
  { name: "orange", price: 3.54 },
  { name: "pear", price: 4.123456 },
  { name: "banana", price: 5.1 },
  { name: "pineapple", price: 6.12345678 },
];

describe("General ceil", () => {
  it("Ceil positive number", () => {
    let res = ceil(5.5);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });
  it("Ceil negative number", () => {
    let res = ceil(-5.5);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(-5);
  });
  it("Ceil to thousands", () => {
    let res = ceil(1234, -3);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(2000);
  });
  it("Ceil zero", () => {
    let res = ceil(0);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(0);
  });
  it("Ceil with small decimal", () => {
    let res = ceil(5.00000000000001);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });
  it("Ceil with precision bigger than decimals", () => {
    let res = ceil(5.5, 3);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(5.5);
  });
  it("Ceil with string", () => {
    let res = ceil("5.5");
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });
  it("Ceil with boolean", () => {
    let res = ceil(true);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(NaN);
  });
  it("Ceil with null", () => {
    let res = ceil(null);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(NaN);
  });
  it("Ceil with undefined", () => {
    let res = ceil(undefined);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(NaN);
  });
});

describe("Ceil prices", () => {
  it("Ceil prices to 2 decimals", () => {
    let res = products.map((product) => {
      return ceil(product.price, 2);
    });
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([2.13, 3.54, 4.13, 5.1, 6.13]);
  });
});
