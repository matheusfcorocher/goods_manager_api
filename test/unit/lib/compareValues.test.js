const { compareValues } = require("../../../src/lib/compareValues");

describe("Lib", () => {
  describe("compareValues", () => {
    describe("when passes an array of objects", () => {
      it("returns in the correct order", () => {
        let array = [
          { id: 24, name: "foo2" },
          { id: 1, name: "foo1" },
        ];
        expect(array.sort(compareValues("id", "asc"))).toEqual([
          { id: 1, name: "foo1" },
          { id: 24, name: "foo2" },
        ]);
      });
    });
    describe("when passes a bad array of objects", () => {
      it("returns in the same order", () => {
        let array = [
          { id: 24, name: "foo2" },
          { name: "foo1"},
          { id: 10, name: "foo3"},
        ];
        expect(array.sort(compareValues("id", "asc"))).toEqual([
          { id: 24, name: "foo2" },
          { name: "foo1"},
          { id: 10, name: "foo3"},
        ]);
      });
    });
  });
});
