import { TestReporter } from "./TestReporter";
import "../css/testframework.css";
import "../tests/test001.js";
import "../tests/test002.js";
import "../tests/test003.js";
import "../tests/test004.js";
import "../tests/test005.js";
import "../tests/test006.js";
import "../tests/test007.js";
import "../tests/test008.js";
import "../tests/test009.js";

const { jasmine } = window;
const jasmineEnv = jasmine.getEnv();
const reporter = new TestReporter();
jasmineEnv.updateInterval = 250;
jasmineEnv.addReporter(reporter);

export function initiateTest() {
  const testPanel = document.createElement("div");
  testPanel.setAttribute("id", "test-panel");
  document.body.appendChild(testPanel);
  reporter.setReportNode(testPanel);
  jasmineEnv.execute();
}
