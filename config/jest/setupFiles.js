import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.render = render;

global.fetch = require("jest-fetch-mock");

global.fetchInit = {
  headers: {
    "content-type": "application/json"
  }
};
