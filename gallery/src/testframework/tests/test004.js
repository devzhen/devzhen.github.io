import { Gallery } from "../../gallery/Gallery";

const { describe, it } = window;
const taskDesc = `<p>Your solution should allow the <code>search()</code> method to accept requests from multiple galleries and route the search results to the appropriate gallery instance.</p>
<p><strong><li>Bonus</strong> - Add a second functioning gallery, side by side</li></p>`;

describe("Task 4 - Multiple requests", () => {
  describe(taskDesc, () => {
    it("should have consistent APIs", () => {
      const gallery = new Gallery(window.imageFinder);

      const requests = [gallery.doSearch("dog", "static")];

      expect(requests[0] instanceof Promise).toBe(true);
    });

    it("accept requests from multiple galleries test", async () => {
      const gallery = new Gallery(window.imageFinder);
      const gallery2 = new Gallery(window.imageFinder);

      const results = await Promise.all([
        gallery.doSearch("dog", "giphy"),
        gallery2.doSearch("dogs", "giphy"),
      ]);

      const gallery1Images = results[0].images || [];
      const gallery2Images = results[1].images || [];
      expect(results[0].query, "check result query for gallery 1").toBe("dog");
      expect(
        gallery1Images.length,
        "check result images for gallery 1"
      ).toBeGreaterThan(0);
      expect(results[1].query, "check result query for gallery 2").toBe("dogs");
      expect(
        gallery2Images.length,
        "check result images for gallery 2"
      ).toBeGreaterThan(0);
    });
  });
});
