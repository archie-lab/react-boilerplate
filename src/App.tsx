import * as React from "react";
import { hot } from "react-hot-loader/root";
import "./App.scss";

class App extends React.Component<{}> {
  render() {
    return <p className="app">Hello</p>;
  }
}

export default hot(App);
