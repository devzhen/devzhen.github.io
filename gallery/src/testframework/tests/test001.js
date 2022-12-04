import { Gallery } from "../../gallery/Gallery";

const { describe, it } = window;
const taskDesc = `<p>Modify <code>ImageFinder.search()</code> to search the title field of items in the <code>staticImagesData</code> array located in <code>resources/static-images-db.js</code></p>
<p>Items that <strong>contain</strong> the search query in the <code>title</code> field should be included.</p>
Example: The query "veg" should return the following:</p>
<pre>
{
  query:"veg",
  images: [
    {
      id: "OE8CVzFzzh;5_sTOzzBihQ--a",
      url: "http://static.wixstatic.com/media/9f980c8bd27279a71406c1bb10916190.wix_mp",
      title: "veggies"
    },
    {
      id: "PxtCbLD6RKrRyGGyKdwJ5w--a",
      url: "http://static.wixstatic.com/media/a0cb4084e9c514ae7ca42143fbedf84a.wix_mp",
      title: "veggies 2"
    }
  ]
}
</pre>
<li>Return results in the above format</li><li>Do not change <code>Gallery</code> for <u>this task</u></li>`;

describe("Task 1 - Search Static Data", () => {
  describe(taskDesc, () => {
    let gallery;
    let results;
    beforeAll(async () => {
      gallery = new Gallery(window.imageFinder);
      results = await Promise.resolve().then(() =>
        gallery.doSearch("dog", "static")
      );
    });

    it("should return the correct number of images", async () => {
      expect(results.images.length).toBe(5);
    });

    it("should be in the correct format", async () => {
      expect(results.query).toBe("dog");
      expect(
        results.images instanceof Array,
        "check that results.images is an Array"
      ).toBeTruthy();
      expect(results.images).toContain({
        id: "vHmdG5nncVmJQNaMyeqR6w--a",
        url: "http://static.wixstatic.com/media/cc9d8bc0f8b1a5338ee79d9eb155d1c4.wix_mp",
        title: "small dogs",
      });

      expect(results.images).toContain({
        id: "AtYPWBjL5BMVxob0OfmLQg--a",
        url: "http://static.wixstatic.com/media/fb376dd2473759bbb248dc4f1b23730e.wix_mp",
        title: "dogfood",
      });

      expect(results.images).toContain({
        id: "dORmr6W5WoH_M48WWcUuQw--a",
        url: "http://static.wixstatic.com/media/85252fdf939e9b37fa16d1f3b2d197e9.wix_mp",
        title: "dog run",
      });

      expect(results.images).toContain({
        id: "gyFHUTuQUJamSHp3VNiJpw--a",
        url: "http://static.wixstatic.com/media/16f9f8e6e00718d108a8889351874fb4.wix_mp",
        title: "book dog",
      });

      expect(results.images).toContain({
        id: "t2SVVJ_a0ESmUC0CVRpGZQ--a",
        url: "http://static.wixstatic.com/media/7f093ca6c9945ebb918772e55cd7b89f.wix_mp",
        title: "office dog",
      });
    });
  });
});
