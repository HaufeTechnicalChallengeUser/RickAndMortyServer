import { addOrDeleteFavorites } from "../utils/favorites";

describe("favorites addOrDeleteFavorites", () => {
  test("should add value if isn't in the array", () => {
    const valueActual = 4;
    const valuesBefore = [1, 2, 3];
    const valuesAfter = addOrDeleteFavorites(valuesBefore, valueActual);
    expect(valuesAfter).toContain(valueActual);
  });

  test("should remove value if is in the array", () => {
    const valueActual = 3;
    const valuesBefore = [1, 2, 3];
    const valuesAfter = addOrDeleteFavorites(valuesBefore, valueActual);
    expect(valuesAfter).not.toContain(valueActual);
  });
});
