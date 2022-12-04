import { Gallery } from "../../gallery/Gallery";
import { ImageFinder } from "../../gallery/ImageFinder";

const { describe, it } = window;
const taskDesc = `<p>Modify your implementation of <code>ImageFinder</code> to allow adding <strong>search strategies</strong> dynamically. Each strategy accepts a search query and returns the search results in the same format as task 1.</p>
<p>Move your search functionality of <code>staticImagesData</code> into its own strategy - name it <code>'static'</code>.</p>
<p><code>ImageFinder</code> should throw an exception for an unknown strategy.</p>
<p>Add the static strategy to the global <code>imageFinder</code> instance.</p>
<p>Tune <code>Gallery.doSearch()</code> to use your new <code>ImageFinder</code> implementation - it should now accept query and strategy id:<br/>
<code>gallery.doSearch(query, strategyId)</code>.</p>`;

describe("Task 2 - Search Strategies", () => {
  describe(taskDesc, () => {
    let gallery;

    beforeAll(async () => {
      gallery = new Gallery(window.imageFinder);
    });

    it("should throw if the strategy is unknown", async () => {
      let thrown = false;

      try {
        await Promise.resolve().then(() =>
          gallery.doSearch("dog", "notARealStrategyId")
        );
      } catch (e) {
        thrown = true;
      }

      expect(thrown).toBe(true);
    });

    it("should throw if the strategy works without being added to the ImageFinder", async () => {
      const imageFinder = new ImageFinder();
      gallery = new Gallery(imageFinder);

      let thrown = false;

      try {
        await Promise.resolve().then(() =>
          gallery.doSearch("dog", "static")
        );
      } catch (e) {
        thrown = true;
      }

      expect(thrown).toBe(true);
    });
  });
});
