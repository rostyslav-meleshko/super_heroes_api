import { FC, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { stateAllHeroes } from "store/selectors";

const HeroPage: FC = () => {
  // const location = useLocation();
  const { heroName, heroId } =
    useParams<{ heroName: string; heroId: string }>();
  const allHeroes = useSelector(stateAllHeroes);
  const currentHero = allHeroes.find((hero) => hero.id === +heroId);

  console.log(currentHero, heroName);

  useEffect(() => {}, []);
  return (
    <>
      {currentHero && (
        <>
          <h2>{currentHero?.name}</h2>
          <img src={currentHero?.images.lg} alt={currentHero?.name} />
        </>
      )}

      {!currentHero && <p>No such hero found</p>}
    </>
  );
};

export default HeroPage;
