import * as React from "react";
import * as ReactDOM from "react-dom";
import Maposh from "./containers/maposh";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "./service/i18n";
import bootstrapAmplify from "./service/middleware";
import bootstrapBridges from "./service/store/bridges";
import bootstrapTheme from "./service/theme";

const root = document.getElementById("root") as HTMLElement;

bootstrapAmplify();
bootstrapBridges();
bootstrapTheme(root);

ReactDOM.render(<Maposh />, root);

registerServiceWorker();
