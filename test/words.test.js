import { expect as _expect } from "chai";
import words from "../src/words.js";
const expect = _expect;

describe("General words", () => {
  it("Words with default pattern", () => {
    let res = words("fred, barney, & pebbles");
    expect(res).to.be.a("array");
    expect(res).to.deep.equal(["fred", "barney", "pebbles"]);
  });
  it("Words with custom RegExp pattern", () => {
    let res = words("fred, barney, & pebbles", /[^, ]+/g);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal(["fred", "barney", "&", "pebbles"]);
  });
  it("Words with custom string pattern", () => {
    let res = words("fred, barney, & pebbles", ",");
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([",", ","]);
  });
  it("Words with custom string pattern and no match", () => {
    let res = words("fred, barney, & pebbles", "not found in there");
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([]);
  });
  it("Words with empty string", () => {
    let res = words("");
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([]);
  });
  it("Words with null should throw TypeError", () => {
    expect(() => words(null)).to.throw(TypeError);
  });
  it("Words with finnish characters", () => {
    let res = words("äiti ääliö ötökkä");
    expect(res).to.be.a("array");
    expect(res).to.deep.equal(["äiti", "ääliö", "ötökkä"]);
  });
});
