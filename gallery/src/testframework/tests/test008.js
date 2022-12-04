import { Gallery } from "../../gallery/Gallery";

const { describe, it } = window;
const taskDesc = `
<p>Implement <code>Gallery.loadMore()</code> to retrieve additional results <b>based on</b> the current <code>limit</code> and <code>query</code>.
Meaning you should load extra <code>limit</code> <b>new</b> images.</p>
<p>When <code>loadMore</code> is called you should return all the previous results and the newly fetched ones.</p>
`;

function isUnique(images) {
  const uniqueIds = [...new Set(images.map((image) => image.id))];
  return uniqueIds.length === images.length;
}

describe("Task 8 - Pagination", () => {
  describe(taskDesc, () => {
    let gallery, results;
    beforeAll(async () => {
      gallery = new Gallery(window.imageFinder);
      results = await Promise.resolve().then(() =>
        gallery.doSearch("dog", "static", 2)
      );
    });
    it("should return paginated results", async () => {
      expect(results.images.length).toBe(2);
      expect(isUnique(results.images)).toBeTruthy();
    });
    it("should load more images", async () => {
      results = await Promise.resolve().then(() => gallery.loadMore());
      expect(results.images.length).toBe(4);
      expect(isUnique(results.images)).toBeTruthy();
    });
    it("should not load more than the available unique images", async () => {
      results = await Promise.resolve().then(() => gallery.loadMore());
      expect(results.images.length).toBe(5);
      expect(isUnique(results.images)).toBeTruthy();

      results = await Promise.resolve().then(() =>
        gallery.doSearch("dog", "giphy", 41)
      );
      expect(results.images.length).toBe(41);
      expect(isUnique(results.images)).toBeTruthy();

      results = await Promise.resolve().then(() => gallery.loadMore());
      expect(results.images.length).toBe(41 * 2);
      expect(isUnique(results.images)).toBeTruthy();
    });
  });
});
