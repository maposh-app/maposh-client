import * as React from "react";
import * as ReactDOM from "react-dom";
import MaposhLanding from "./containers/landing";
import "./index.css";
import { unregister } from "./registerServiceWorker";
import "./service/i18n";
import bootstrapTheme from "./service/theme";

const root = document.getElementById("root") as HTMLElement;

bootstrapTheme(root);

ReactDOM.render(<MaposhLanding />, root);

unregister();
