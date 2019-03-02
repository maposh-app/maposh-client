import * as React from "react";
import * as ReactDOM from "react-dom";

import "./i18n";

import Maposh from "./components/maposh";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Typographer from "./theme/typography";

Typographer.injectStyles();

ReactDOM.render(<Maposh />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
