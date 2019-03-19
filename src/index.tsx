import * as React from "react";
import { Suspense } from "react";
import * as ReactDOM from "react-dom";
import Loader from "./components/loader";
import Maposh from "./containers/maposh";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "./service/i18n";
import bootstrapAmplify from "./service/middleware";
import bootstrapStore from "./service/store";
import bootstrapBridges from "./service/store/bridges";
import bootstrapTheme from "./service/theme";

const root = document.getElementById("root") as HTMLElement;

bootstrapAmplify();
const store = bootstrapStore();
bootstrapBridges(store);
bootstrapTheme(root);

ReactDOM.render(<Maposh store={store} />, root);

registerServiceWorker();
