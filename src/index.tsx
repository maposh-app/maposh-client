import * as React from "react";
import { Suspense } from "react";
import * as ReactDOM from "react-dom";

import Spinner from "react-spinkit";
import "./service/i18n";

import bootstrapAmplify from "./service/middleware";
import bootstrapTheme from "./service/theme";

import Maposh from "./containers/maposh";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

bootstrapTheme();
bootstrapAmplify();

ReactDOM.render(
  <Suspense fallback={<Spinner name="rotating-plane" />}>
    <Maposh />
  </Suspense>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
