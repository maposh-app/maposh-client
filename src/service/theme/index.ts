import ReactModal from "react-modal";
import config from "../../config";
import Typographer from "./typography";

const bootstrapTheme = () => {
  ReactModal.setAppElement("#root");
  Typographer.injectStyles();
  document.body.style.backgroundColor = config.theme.colorPrimary;
};

export default bootstrapTheme;
