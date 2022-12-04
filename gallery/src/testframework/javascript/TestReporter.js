export class TestReporter {
  constructor(doc) {
    this.document = doc || document;
    this.suiteDivs = {};
    this.logRunningSpecs = false;
    this._reportNode = document.body;
    this.suites = {};
  }

  setReportNode(node) {
    this._reportNode = node || this._reportNode;
  }

  createDom(type, attrs, childrenVarArgs) {
    var el = document.createElement(type);

    for (var i = 2; i < arguments.length; i++) {
      var child = arguments[i];

      if (typeof child === "string") {
        el.appendChild(document.createTextNode(child));
      } else {
        if (child) {
          el.appendChild(child);
        }
      }
    }

    for (var attr in attrs) {
      if (attr === "className") {
        el[attr] = attrs[attr];
      } else {
        el.setAttribute(attr, attrs[attr]);
      }
    }

    return el;
  }

  jasmineStarted(options) {
    // console.log('jasmine starting');
  }

  specDone(spec) {
    if (!this.suites[this.currentSuite.id]) {
      this.suites[this.currentSuite.id] = { ...this.currentSuite };
    }
    if (spec.status === "failed") {
      if (!this.firstFailingIt) {
        this.firstFailingIt = {
          description: spec && spec.description,
          message:
            spec.failedExpectations[0] && spec.failedExpectations[0].message,
        };
      }
      this.suites[this.currentSuite.id].status = "failed";
    }
  }

  suiteStarted(suite) {
    this.currentSuite = suite;
  }

  suiteDone(suite) {
    // console.log('suite done: ', suite)
  }

  jasmineDone(result) {
    //console.log('jasmine done: ', result);
    this.foundFirstFailedTest = false;
    const suiteKeys = Object.keys(this.suites);
    for (let i = 0; i < suiteKeys.length; i++) {
      const suite = this.suites[suiteKeys[i]];
      const taskResults = this._createDescribeResults(suite, true);
      const childNodes = this._reportNode.childNodes;
      if (childNodes.length > 0) {
        this._reportNode.appendChild(taskResults.node, childNodes[0]);
      } else {
        this._reportNode.appendChild(taskResults.node);
      }
    }
  }

  _createDescribeResults(suite, isTopTask) {
    const title = suite.fullName.replace(suite.description, "").trim();
    const subtitle = suite.description;

    // title
    const descNode = this.createDom("div", { className: "task" });
    const descTitleNode = this.createDom("div", {
      className: "description top",
    });
    const taskState = suite.status === "failed" ? "failed" : "passed";
    descTitleNode.classList.add(taskState);
    descNode.classList.add(taskState);

    descTitleNode.innerHTML = title;
    descNode.appendChild(descTitleNode);

    // describe block
    const subtitleDescNode = this.createDom("div", { className: "task" });
    const descSubtitleNode = this.createDom("div", {
      className: "description item",
    });
    descSubtitleNode.innerHTML = subtitle;
    subtitleDescNode.classList.add(taskState);
    descSubtitleNode.classList.add(taskState);

    subtitleDescNode.appendChild(descSubtitleNode);
    descNode.appendChild(subtitleDescNode);

    if (taskState === "failed" && !this.foundFirstFailedTest) {
      this.foundFirstFailedTest = true;
      descNode.classList.add("current");
      const descFailingExpectation = this.createDom("div", {
        className: "expectation-message",
      });
      if (this.firstFailingIt) {
        descFailingExpectation.innerHTML = `<strong>${this.firstFailingIt.description}:</strong> ${this.firstFailingIt.message}`;
      }
      descSubtitleNode.appendChild(descFailingExpectation);
    }
    return { node: descNode, state: taskState };
  }
}
