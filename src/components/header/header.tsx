import { Link } from "@reach/router";
import * as React from "react";
import { Menu, MenuItem } from "./header.css";

export const Header: React.FunctionComponent = () => (
  <Menu>
    <MenuItem>
      <Link to="/">
        <h1>Maposh</h1>
      </Link>
    </MenuItem>
  </Menu>
);
