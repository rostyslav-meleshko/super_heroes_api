import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import store from "store/rootStore";
import App from "App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        {/*add here theme provider for breakpoints, etc, colors*/}
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
