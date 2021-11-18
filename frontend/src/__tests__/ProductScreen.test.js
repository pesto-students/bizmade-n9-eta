import React from "react";
import ReactDOM from "react-dom";
import ProductScreen from "../screens/ProductScreen";

it("renders without crashing", () => {
  const product = document.createElement("product");
  ReactDOM.render(<ProductScreen></ProductScreen>, product);
});
