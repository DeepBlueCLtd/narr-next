import App from "./components/App";
import React from "react";
import enzyme from 'enzyme';
import { createStore } from "redux";
import entryApp from "./reducers/reducers";

/* eslint-disable no-underscore-dangle */
const store = createStore(entryApp);

beforeAll(() => {});
it("renders without crashing", () => {
  const component=enzyme.shallow(<App store={store} />);
  expect(component.length).toBe(1);
});
