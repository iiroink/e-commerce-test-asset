import { expect as _expect } from "chai";
import memoize from "../src/memoize.js";
const expect = _expect;

describe("General memoize", () => {

  it("Memoize values", () => {
    const add = ((a, b) => a + b);
    const memoizedAdd = memoize(add);
    let res = memoizedAdd(1, 5);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
  });

  it("Calling memoize multiple times", () => {
    const add = ((a, b) => a + b);
    const memoizedAdd = memoize(add);
    let res = memoizedAdd(1, 5);
    let res2 = memoizedAdd(1, 5);
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(6);
    expect(res2).to.be.a("number");
    expect(res2).to.deep.equal(6);
  });

  it("Pass a non function to memoize", () => {
    expect(() => memoize('not a function')).to.throw(TypeError);
  });

  it('should cache results for the same arguments', () => {
    const myFunction = (x) => x * 2;
    const memoizedFunction = memoize(myFunction);

    const result1 = memoizedFunction(5);
    assert.strictEqual(result1, 10);

    assert.isTrue(memoizedFunction.cache.has(5));

    const result2 = memoizedFunction(5);
    assert.strictEqual(result2, 10); 

    assert.strictEqual(myFunction.callCount, 1);
  });
  it('should update cache and return result', () => {
    const myFunction = (x) => x * 2;
    const memoizedFunction = memoize(myFunction);

    const key = 5;

    expect(memoizedFunction.cache.size).to.equal(0);

    const result1 = memoizedFunction(key);

    expect(memoizedFunction.cache.size).to.equal(1);
    expect(memoizedFunction.cache.get(key)).to.equal(result1);

    const result2 = memoizedFunction(key);

    expect(memoizedFunction.cache.size).to.equal(1); 
    expect(result2).to.equal(result1); 
  });
  it('should call the original function and update cache', () => {
    // Mock original function
    const myFunction = (x) => x * 2;
    const originalFunctionSpy = sinon.spy(myFunction);

    // Create memoized function
    const memoizedFunction = memoize(originalFunctionSpy);

    // Call memoized function for the first time
    const key = 5;
    const result1 = memoizedFunction(key);

    // Ensure the original function was called and cache was updated
    expect(originalFunctionSpy.calledOnce).to.be.true;
    expect(memoizedFunction.cache.get(key)).to.equal(result1);

    // Call memoized function for the second time with the same key
    const result2 = memoizedFunction(key);

    // Ensure the original function was not called again, and the result is returned from the cache
    expect(originalFunctionSpy.calledOnce).to.be.true;
    expect(result2).to.equal(result1);
  });
  it('should calculate result, update cache, and return result', () => {
    const myFunction = (x) => x * 2;
    const memoizedFunction = memoize(myFunction);

    const key = 5;

    // Ensure cache is initially empty
    expect(memoizedFunction.cache.size).to.equal(0);

    // Call the memoized function for the first time
    const result1 = memoizedFunction(key);

    // Ensure cache is updated with the result
    expect(memoizedFunction.cache.size).to.equal(1);
    expect(memoizedFunction.cache.get(key)).to.equal(result1);

    // Call the memoized function for the second time with the same key
    const result2 = memoizedFunction(key);

    // Ensure cache is not updated again, and the result is returned from the cache
    expect(memoizedFunction.cache.size).to.equal(1); // Size should still be 1
    expect(result2).to.equal(result1); // Result should be the same as the first call
  });
});