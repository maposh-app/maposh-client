import * as React from "react";
import * as ReactDOM from "react-dom";
import Maposh from "./maposh";

jest.mock("@reach/router", () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}))
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Maposh />, div);
  ReactDOM.unmountComponentAtNode(div);
});
