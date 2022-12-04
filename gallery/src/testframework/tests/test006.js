import { Gallery } from "../../gallery/Gallery";

const { describe, it } = window;
const taskDesc = `<p>Searching for "wedding" returns duplicate results.</p>
<p>Your search should return unique results, based on <code>id</code> param.</p>`;

describe("Task 6 - Uniqueness", () => {
  describe(taskDesc, () => {
    it("should return unique results", async () => {
      const gallery = new Gallery(window.imageFinder);
      let results = await Promise.resolve().then(() =>
        gallery.doSearch("sn", "static", 15)
      );

      expect(results.query).toBe("sn");
      const imageIds = results.images.map((image) => image.id);
      expect(imageIds.length).toBe(11);
    });
  });
});
