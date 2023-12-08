import { expect as _expect } from "chai";
import isDate from "../src/isDate.js";
const expect = _expect;

describe("General isDate", () => {
  it("isDate with date object", () => {
    let res = isDate(new Date());
    expect(res).to.be.a("boolean");
    expect(res).to.deep.equal(true);
  });
  it("isDate with leap day", () => {
    let res = isDate(new Date(2000, 1, 29, 12));
    expect(res).to.be.a("boolean");
    expect(res).to.deep.equal(true);
  });
  it("isDate with invalid string", () => {
    let res = isDate("Mon April 23 2012");
    expect(res).to.be.a("boolean");
    expect(res).to.deep.equal(false);
  });
  it("isDate with actual string date", () => {
    let res = isDate("2020-12-12");
    expect(res).to.be.a("boolean");
    expect(res).to.deep.equal(false);
  });
  it("isDate with epoch time", () => {
    let res = isDate(1607725200000);
    expect(res).to.be.a("boolean");
    expect(res).to.deep.equal(false);
  });
  it("isDate with null", () => {
    let res = isDate(null);
    expect(res).to.be.a("boolean");
    expect(res).to.deep.equal(false);
  });
  it("isDate with undefined", () => {
    let res = isDate(undefined);
    expect(res).to.be.a("boolean");
    expect(res).to.deep.equal(false);
  });
  it("isDate with number", () => {
    let res = isDate(123);
    expect(res).to.be.a("boolean");
    expect(res).to.deep.equal(false);
  });
  it("isDate with boolean", () => {
    let res = isDate(true);
    expect(res).to.be.a("boolean");
    expect(res).to.deep.equal(false);
  });
});
