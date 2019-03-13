import * as React from "react";
import * as ReactDOM from "react-dom";
import Maposh from ".";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Maposh />, div);
  ReactDOM.unmountComponentAtNode(div);
});
