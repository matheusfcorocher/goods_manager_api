const { compareValues } = require("../../../src/lib/compareValues");

describe("Helpers Tests ", () => {
  describe("compareValues", () => {
    describe("when passes an array of objects", () => {
      let array = [
        { id: 24, name: "foo2" },
        { id: 1, name: "foo1" },
      ];
      it("returns in the correct order", () => {
        expect(array.sort(compareValues("id", "asc"))).toEqual([
          { id: 1, name: "foo1" },
          { id: 24, name: "foo2" },
        ]);
      });
    });
  });
});
