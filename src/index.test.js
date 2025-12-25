import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

jest.mock("./App", () => () => <div>App Component</div>);

jest.mock("./reportWebVitals", () => jest.fn());

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => (
    <div data-testid="browser-router">{children}</div>
  ),
}));

describe("index.js", () => {
  let rootElement;
  let mockRender;

  beforeEach(() => {
    rootElement = document.createElement("div");
    rootElement.setAttribute("id", "root");
    document.body.appendChild(rootElement);

    mockRender = jest.fn();

    jest
      .spyOn(ReactDOM, "createRoot")
      .mockReturnValue({ render: mockRender });
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  test("renders App inside BrowserRouter using createRoot", () => {
    require("./index");

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootElement);
    expect(mockRender).toHaveBeenCalled();
    expect(reportWebVitals).toHaveBeenCalled();
  });
});
