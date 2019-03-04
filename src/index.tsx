import * as React from "react";
import * as ReactDOM from "react-dom";

import "./i18n";

import { Suspense } from "react";
import Spinner from "react-spinkit";

import Maposh from "./components/maposh";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Typographer from "./theme/typography";

Typographer.injectStyles();

ReactDOM.render(
  <Suspense fallback={<Spinner name="rotating-plane" />}>
    <Maposh />
  </Suspense>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
