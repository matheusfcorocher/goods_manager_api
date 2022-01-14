const Resource = require("../../../../src/domain/entities/Resource");

describe("Resource Tests ", () => {
    describe("verifyName", () => {
      let resource = new Resource({ id: 1, name: "water", weight: 100 });
      describe("if resource name is water", () => {
        it("returns true", () => {
          expect(resource.verifyName()).toEqual(true);
        });
      });
      describe("if resource name is food", () => {
        it("returns true", () => {
          resource.setName("food");
          expect(resource.verifyName()).toEqual(true);
        });
      });
  
      describe("if resource name is minerals", () => {
        it("returns true", () => {
          resource.setName("minerals");
          expect(resource.verifyName()).toEqual(true);
        });
      });
  
      describe(`if resource name isnt 'minerals' or 'food' or 'water'`, () => {
        it("returns false", () => {
          resource.setName("salmon");
          expect(resource.verifyName()).toEqual(false);
        });
      });
    });
  });