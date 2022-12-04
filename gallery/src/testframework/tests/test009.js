import { Gallery } from "../../gallery/Gallery";

const { describe, it, jasmine } = window;
const taskDesc = `<p>Since now <code>search()</code> returns results asynchronously,
the order in which the results are returning is not guaranteed.
This might cause unwanted old results to be returned <strong>after</strong> newer queries.
Change the <code>Gallery</code> so that responses from old requests are rejected (should work for all search strategies).</p>`;

describe("Task 9 - Nuts & Bolts", () => {
  describe(taskDesc, () => {
    it("async giphy result test", async () => {
      const gallery = new Gallery(window.imageFinder);
      const mySpy = new jasmine.createSpy();
      const expiredRequest = gallery.doSearch("dogs", "giphy").then(mySpy);
      const successfulRequest = gallery.doSearch("dogs", "giphy").then(mySpy);

      try {
        await expiredRequest;
      } catch (e) {}
      await successfulRequest;

      const results = mySpy.calls.argsFor(0)[0];
      expect(mySpy.calls.count()).toBe(1);
      expect(results.query, "check result query").toBe("dogs");
    });
  });
});
