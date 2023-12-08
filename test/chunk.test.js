import { expect as _expect } from "chai";
import chunk from "../src/chunk.js";
const expect = _expect;

const stringData = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const products = [
  { name: "apple", price: 2 },
  { name: "orange", price: 3 },
  { name: "pear", price: 4 },
  { name: "banana", price: 5 },
  { name: "pineapple", price: 6 },
];

describe("General chunk", () => {
  it("Chunk evenly", () => {
    let res = chunk(stringData, 2);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([
      ["a", "b"],
      ["c", "d"],
      ["e", "f"],
      ["g", "h"],
      ["i", "j"],
    ]);
  });
  it("Chunk unevenly", () => {
    let res = chunk(stringData, 3);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
      ["j"],
    ]);
  });
  it("Chunk with size larger than array", () => {
    let res = chunk(stringData, 20);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([
      ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    ]);
  });
  it("Chunk with size equal to array", () => {
    let res = chunk(stringData, 10);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([
      ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    ]);
  });
  it("Chunk empty array", () => {
    let res = chunk([], 10);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([]);
  });
  it("Chunk with non-array object", () => {
    let res = chunk({ a: "b" }, 10);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([]);
  });
  it("Chunk with negative size", () => {
    let res = chunk(stringData, -1);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([]);
  });
  it("Chunk with zero size", () => {
    let res = chunk(stringData, 0);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([]);
  });
  it("Chunk with string size", () => {
    let res = chunk(stringData, "2");
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([
      ["a", "b"],
      ["c", "d"],
      ["e", "f"],
      ["g", "h"],
      ["i", "j"],
    ]);
  });
  it("Chunk with non-numeric size", () => {
    let res = chunk(stringData, "string");
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([]);
  });
  it("Try to chunk null array", () => {
    let res = chunk(null, 2);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([]);
  });
});

describe("Chunk items on a page", () => {
  it("Chunk 3 items on a page", () => {
    let res = chunk(products, 3);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([
      [
        { name: "apple", price: 2 },
        { name: "orange", price: 3 },
        { name: "pear", price: 4 },
      ],
      [
        { name: "banana", price: 5 },
        { name: "pineapple", price: 6 },
      ],
    ]);
  });
  it("Chunk 2 items on a page", () => {
    let res = chunk(products, 2);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([
      [
        { name: "apple", price: 2 },
        { name: "orange", price: 3 },
      ],
      [
        { name: "pear", price: 4 },
        { name: "banana", price: 5 },
      ],
      [{ name: "pineapple", price: 6 }],
    ]);
  });
  it("Chunk 20 items on a page", () => {
    let res = chunk(products, 20);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([
      [
        { name: "apple", price: 2 },
        { name: "orange", price: 3 },
        { name: "pear", price: 4 },
        { name: "banana", price: 5 },
        { name: "pineapple", price: 6 },
      ],
    ]);
  });
  it("Try to chunk 0 items on a page", () => {
    let res = chunk(products, 0);
    expect(res).to.be.a("array");
    expect(res).to.deep.equal([]);
  });
});
