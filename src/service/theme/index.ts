import ReactModal from "react-modal";
import config from "../../config";
import Typographer from "./typography";

const bootstrapTheme = (appElement: string | HTMLElement) => {
  ReactModal.setAppElement(appElement);
  Typographer.injectStyles();
  document.body.style.backgroundColor = config.theme.colorPrimary;
};

export default bootstrapTheme;
