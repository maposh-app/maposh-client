import * as React from "react";

import "./App.css";
import { Header } from "./components/header/header";
import Map from "./components/map/map";

class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <Map />;
      </div>
    );
  }
}

export default App;
