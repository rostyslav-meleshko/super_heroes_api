import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <HashRouter>
        <App />
      </HashRouter>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById("root")
);

