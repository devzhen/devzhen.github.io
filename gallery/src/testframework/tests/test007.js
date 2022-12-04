import { debounce } from "../../gallery/debounce";

const { describe, it, jasmine } = window;
const taskDesc = `
  <p>A debouncer is a function that limits the rate at which a function can fire</p>
  <p>Our gallery search function is being debounced, however, something went wrong with our implementation.</p>
  <p>Fix the <code>debounce()</code> function located in <code>./debounce.js</code> to make it work as expected.</p>
`;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Task 7 - Debouncer", () => {
  describe(taskDesc, () => {
    it("should debounce a function", async () => {
      const ms = 200;
      const spy = new jasmine.createSpy();

      const debouncedFunction = debounce(spy, ms);
      debouncedFunction(1);
      debouncedFunction(2);
      debouncedFunction(3);

      await delay(ms + 100);

      debouncedFunction(4);
      debouncedFunction(5);

      await delay(ms + 100);

      expect(spy.calls.count()).toBe(2);
      expect(spy).not.toHaveBeenCalledWith(1);
      expect(spy).not.toHaveBeenCalledWith(2);
      expect(spy).not.toHaveBeenCalledWith(4);
      expect(spy).toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(5);
    });
  });
});
