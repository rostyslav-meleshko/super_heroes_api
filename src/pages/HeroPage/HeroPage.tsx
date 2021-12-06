import { FC, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const HeroPage: FC = () => {
  const location = useLocation();
  const { heroName, heroId } =
    useParams<{ heroName?: string; heroId?: string }>();

  // upcoming logic with fetch data according to the id and load it from server,
  // or read data from redux => in this case better to save all heroes in redux store

  useEffect(() => {}, []);
  return <p>{`Hero ${heroName} Page`}</p>;
};

export default HeroPage;
