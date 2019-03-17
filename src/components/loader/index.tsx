import * as React from "react";
import Spinner from "react-spinkit";
import config from "../../config";
import { Modal } from "../modal";

const Loader: React.FC = () => {
  return (
    <Modal
      className={"Loader"}
      isOpen={true}
      content={<Spinner name="chasing-dots" color={config.theme.colorTender} />}
      shouldCloseOnOverlayClick={false}
    />
  );
};

export default Loader;
