import React, {Component} from "react";
import {hot} from "react-hot-loader/root";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <p className="app">Hello</p>;
  }
}

export default hot(App);
