import { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import HeroPage from "./pages/HeroPage/HeroPage";

const App: FC = () => {
  return (
    <Switch>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      <Route path="/hero" exact>
        <HeroPage />
      </Route>
      <Redirect to="/home" />
    </Switch>
  );
};

export default App;
