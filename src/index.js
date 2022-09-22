import React from "react";

import "./index.css";

import App from "./app";

if (typeof document !== "undefined") {
  const ReactDOM = require("react-dom/client");
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(App));

  const reportWebVitals = require("./reportWebVitals").default;
  const webVitalsHandler = console.log;
  reportWebVitals(webVitalsHandler);
}
