const { jasmineRequire } = window;

window.jasmine = jasmineRequire.core(jasmineRequire);


/**
 * Create the Jasmine environment. This is used to run all specs in a project.
 */
var env = jasmine.getEnv();

/**
 * ## The Global Interface
 *
 * Build up the functions that will be exposed as the Jasmine public interface. A project can customize, rename or alias any of these functions as desired, provided the implementation remains unchanged.
 */
var jasmineInterface = jasmineRequire.interface(jasmine, env);

/**
 * Add all of the Jasmine global/public interface to the global scope, so a project can use the public interface directly. For example, calling `describe` in specs instead of `jasmine.getEnv().describe`.
 */
extend(window, jasmineInterface);

/**
 * ## Runner Parameters
 *
 * More browser specific code - wrap the query string in an object and to allow for getting/setting parameters from the runner user interface.
 */

// var queryString = new jasmine.QueryString({
//     getWindowLocation: function() { return window.location; }
// });

// var catchingExceptions = queryString.getParam("catch");
// env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);

// var throwingExpectationFailures = queryString.getParam("throwFailures");
// env.throwOnExpectationFailure(throwingExpectationFailures);

// var random = queryString.getParam("random");
// env.randomizeTests(random);

// var seed = queryString.getParam("seed");
// if (seed) {
// env.seed(seed);
// }


/**
 * The `jsApiReporter` also receives spec results, and is used by any environment that needs to extract the results  from JavaScript.
 */
env.addReporter(jasmineInterface.jsApiReporter);

/**
 * Filter which specs will be run by matching the start of the full name against the `spec` query param.
 */
// var specFilter = new jasmine.HtmlSpecFilter({
// filterString: function() { return queryString.getParam("spec"); }
// });

// env.specFilter = function(spec) {
// return specFilter.matches(spec.getFullName());
// };

/**
 * Setting up timing functions to be able to be overridden. Certain browsers (Safari, IE 8, phantomjs) require this hack.
 */
window.setTimeout = window.setTimeout;
window.setInterval = window.setInterval;
window.clearTimeout = window.clearTimeout;
window.clearInterval = window.clearInterval;

/**
 * ## Execution
 *
 * Replace the browser window's `onload`, ensure it's called, and then run all of the loaded specs. This includes initializing the `HtmlReporter` instance and then executing the loaded Jasmine environment. All of this will happen after all of the specs are loaded.
 */
var currentWindowOnload = window.onload;

window.onload = function () {
  if (currentWindowOnload) {
    currentWindowOnload();
  }
  env.execute();
};

/**
 * Helper function for readability above.
 */
function extend(destination, source) {
  for (var property in source) destination[property] = source[property];
  return destination;
}