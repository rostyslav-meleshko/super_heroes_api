import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import store from "./redux/store";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
        <HashRouter>
          <App />
        </HashRouter>
      </CssBaseline>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
