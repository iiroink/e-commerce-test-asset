import { expect as _expect } from "chai";
import memoize from "../src/memoize.js";
const expect = _expect;

class CustomCache {
  constructor() {
    this.store = new Map();
  }

  has(key) {
    return this.store.has(key);
  }

  get(key) {
    return this.store.get(key);
  }

  set(key, value) {
    this.store.set(key, value);
    // Notice that we're not returning anything here
  }
}

describe("General memoize", () => {
  it("Memoize values", () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);
    let res = memoizedAdd(1, 5);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });

  it("Calling memoize multiple times", () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);
    let res = memoizedAdd(1, 5);
    let res2 = memoizedAdd(1, 5);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
    expect(res2).to.be.a("number");
    expect(res2).to.deep.equal(6);
  });

  it("Memoize with custom cache", () => {
    const add = (a, b) => a + b;
    const memoizedAdd = memoize(add);
    memoizedAdd.cache = new CustomCache();
    let res = memoizedAdd(1, 5);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });

  it("Initialise memoize with null cache", () => {
    const add = (a, b) => a + b;
    memoize.Cache = null;
    const memoizedAdd = memoize(add);
    let res = memoizedAdd(1, 5);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });

  it("Pass a non function to memoize", () => {
    expect(() => memoize("not a function")).to.throw(TypeError);
  });

});
