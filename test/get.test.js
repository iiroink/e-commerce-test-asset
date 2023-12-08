import { expect as _expect } from "chai";
import get from "../src/get.js";
const expect = _expect;

describe("General get use", () => {
  it("Get the value at `path` of `object`", () => {
    const object = { 'a': [{ 'b': { 'c': 8 } }] }
    let res = get(object, 'a[0].b.c');
    expect(res).to.be.a("number");
    expect(res).to.deep.equal(8);
  });it("Case of default value", () => {
    const object = { 'a': [{ 'b': { 'c': 8 } }] }
    let res = get(object, 'a.b.c', 'default value');
    expect(res).to.be.a("string");
    expect(res).to.deep.equal('default value');
  });
});
describe("User information get", () => {
  it("Get the value of users address", () => {
        const userobject = { 'user': { 
             'data': [
                { 'email': 'user.user@mail.com' },
                { 'address': 'userstreet231' }  
            ]   }  }
    let res = get(userobject, 'user.data[1].address');
    expect(res).to.be.a("string");
    expect(res).to.deep.equal('userstreet231');
  });
  
  it("Try to get a missing last name", () => {
    const userobject = { 'user': { 
        'data': [
           { 'email': 'user.user@mail.com' },
           { 'address': 'userstreet231' },
           { 'name': [
           {'first': 'Matti'},
           {'last': null}
         ] }  ]   }  }
    let res = get(userobject, 'user.data[2].name[0].last');
    expect(res).to.be.undefined;
  });

  it("Get first name with other pathing", () => {
    const userobject = { 'user': { 
        'data': [
           { 'email': 'user.user@mail.com' },
           { 'address': 'userstreet231' },
           { 'name': [
           {'first': 'Matti'},
           {'last': undefined}
         ] }  ]   }  }
    let res = get(userobject, ['user', 'data', '2', 'name', '0', 'first']);
    expect(res).to.be.a("string");
    expect(res).to.deep.equal('Matti');
  });

  it("Trying with a null object", () => {
    const userobject = null;
    let res = get(userobject, 'user.data[2].name[0].last');
    expect(res).to.be.undefined;
  });

  it("Trying with a undefined object", () => {
    const userobject = undefined;
    let res = get(userobject, 'user.data[2].name[0].last');
    expect(res).to.be.undefined;
  });
});