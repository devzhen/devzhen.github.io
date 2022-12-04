import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Gallery } from "./gallery/Gallery.view";
import { ImageFinder } from "./gallery/ImageFinder";
import registerServiceWorker from "./registerServiceWorker";
import { initiateTest } from "./testframework/javascript/TestManager";
import { SEARCH_STRATEGY } from './constants/index';

// Create a global instance for ImageFinder
const imageFinder = new ImageFinder({ searchStrategies: Object.values(SEARCH_STRATEGY) });
window.imageFinder = imageFinder;
window.onload = () => {
  initiateTest();
};

ReactDOM.render(
  <>
    <Gallery imageFinder={imageFinder} />
  </>,
  document.getElementById("root")
);
registerServiceWorker();
