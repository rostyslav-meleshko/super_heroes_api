import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomePage from "pages/HomePage/HomePage";
import HeroPage from "pages/HeroPage/HeroPage";
import { getFavoriteHeroesFromSessionStorage } from "store/utils";
import { setFavoriteHeroes } from "store/actions";

const App: FC = () => {
  const dispatch = useDispatch();
  dispatch(setFavoriteHeroes(getFavoriteHeroesFromSessionStorage()));

  return (
    <Switch>
      <Route path="/home" exact>
        <HomePage />
      </Route>
      <Route path="/hero/:heroName/id/:heroId" exact>
        <HeroPage />
      </Route>
      <Redirect to="/home" />
    </Switch>
  );
};

export default App;
