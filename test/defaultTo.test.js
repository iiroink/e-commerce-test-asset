import { expect as _expect } from "chai";
import defaultTo from "../src/defaultTo.js";
const expect = _expect;

describe("General defaultTo", () => {
    it("defaultTo with null", () => {
        let res = defaultTo(null, "default");
        expect(res).to.be.a("string");
        expect(res).to.deep.equal("default");
    });
    it("defaultTo with undefined", () => {
        let res = defaultTo(undefined, "default");
        expect(res).to.be.a("string");
        expect(res).to.deep.equal("default");
    });
    it("defaultTo with NaN", () => {
        let res = defaultTo(NaN, "default");
        expect(res).to.be.a("string");
        expect(res).to.deep.equal("default");
    });
    it("defaultTo with number", () => {
        let res = defaultTo(1, "default");
        expect(res).to.be.a("number");
        expect(res).to.deep.equal(1);
    });
    it("defaultTo with string", () => {
        let res = defaultTo("string", "default");
        expect(res).to.be.a("string");
        expect(res).to.deep.equal("string");
    });
    it("defaultTo with empty string", () => {
        let res = defaultTo("", "default");
        expect(res).to.be.a("string");
        expect(res).to.deep.equal("");
    });
    it("defaultTo with boolean", () => {
        let res = defaultTo(true, "default");
        expect(res).to.be.a("boolean");
        expect(res).to.deep.equal(true);
    });
    it("defaultTo with object", () => {
        let res = defaultTo({ "a": 1 }, "default");
        expect(res).to.be.a("object");
        expect(res).to.deep.equal({ "a": 1 });
    });
    it("defaultTo with array", () => {
        let res = defaultTo([1, 2, 3], "default");
        expect(res).to.be.a("array");
        expect(res).to.deep.equal([1, 2, 3]);
    });
});
