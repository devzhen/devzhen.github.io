import { Gallery } from "../../gallery/Gallery";

const { describe, it } = window;
const taskDesc = `<p>Modify <code>Gallery.doSearch()</code> to accept a limit parameter and limit the search results. The limit should work for all the strategies.</p>
<p><li><strong>Bonus</strong> - Add a dropdown menu in the gallery to select a limit (5, 10, 15, 20, 25).</li></p>`;

describe("Task 5 - Limits", () => {
  describe(taskDesc, () => {
    it("should limit the static results", async () => {
      const gallery = new Gallery(window.imageFinder);
      let results = await Promise.resolve().then(() =>
        gallery.doSearch("po", "static", 5)
      );

      expect(results.query).toBe("po");
      expect(
        results.images instanceof Array,
        "check that results.images is an Array"
      ).toBeTruthy();
      expect(results.images.length).toBe(5);

      results = await Promise.resolve().then(() =>
        gallery.doSearch("po", "static", 10)
      );
      expect(results.query).toBe("po");
      expect(results.images.length).toBe(8);
    });

    it("should limit the giphy results", async () => {
      const gallery = new Gallery(window.imageFinder);

      let results = await Promise.resolve().then(() =>
        gallery.doSearch("dog", "giphy", 5)
      );
      expect(results.query).toBe("dog");
      expect(results.images.length).toBe(5);
    });
  });
});
