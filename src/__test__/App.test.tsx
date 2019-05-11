import * as React from "react";
import {shallow} from "enzyme";
// import Adapter from "enzyme-adapter-react-16";

import App from "../App";

// configure({adapter: new Adapter()});

describe("App Component", () => {
  it("should exist", () => {
    expect(shallow(<App />)).toBeTruthy();
  });

  it("should exist", () => {
    expect(shallow(<App />)).toBeTruthy();
  });

  it("should have one heading", () => {
    expect(
      shallow(<App />)
        .find(".app")
        .type()
    ).toEqual("p");
  });

  it("should match snapshot", () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
