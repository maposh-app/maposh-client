import * as React from "react";
import * as ReactDOM from "react-dom";
import Maposh from ".";
import bootstrapStore from "../../service/store";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Maposh store={bootstrapStore()} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
