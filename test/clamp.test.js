import { expect as _expect } from "chai";
import clamp from "../src/clamp.js";
const expect = _expect;

describe("General clamp", () => {
  it("Clamp positive number in range", () => {
    let res = clamp(5, 0, 10);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(5);
  });
  it("Clamp negative number in range", () => {
    let res = clamp(-5, -10, 0);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(-5);
  });
  it("Clamp positive number out of range", () => {
    let res = clamp(15, 0, 10);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(10);
  });
  it("Clamp negative number out of range", () => {
    let res = clamp(-15, -10, 0);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(-10);
  });
  it("Clamp with lower bound larger than upper bound", () => {
    let res = clamp(5, 10, 0);
    expect(res).to.be.a("number");
    expect(res).to.not.deep.equal(5);
  });
  it("Clamp with string parameters", () => {
    let res = clamp("5", "0", "10");
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(5);
  });
  it("Clamp with booleans as parameters", () => {
    let res = clamp(true, 0, 10);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(NaN);
  });
  it("Clamp with null as parameters", () => {
    let res = clamp(1, null, null);
    expect(res).to.be.a("number");
    expect(res).to.not.deep.equal(1);
  });
  it("Clamp with non-numeric parameters", () => {
    let res = clamp("string", "string", "string");
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(NaN);
  });
});

const MAX_PRICE = 1000000000;

describe("User input clamping", () => {
  it("Try to enter negative price", () => {
    let res = clamp(-1, 0, MAX_PRICE);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(0);
  });
  it("Try to enter price over 1 billion", () => {
    let res = clamp(MAX_PRICE + 1, 0, MAX_PRICE);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(MAX_PRICE);
  });
  it("Try to enter price as string", () => {
    let res = clamp("100", 0, MAX_PRICE);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(100);
  });
  it("Try to enter price as boolean", () => {
    let res = clamp(true, 0, MAX_PRICE);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(NaN);
  });
});
