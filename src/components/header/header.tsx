import { Link } from "@reach/router";
import * as React from "react";

export const Header: React.FunctionComponent = () => (
  <div>
    <Link to="/">
      <h1>Maposh</h1>
    </Link>
  </div>
);
