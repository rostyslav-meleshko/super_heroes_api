import { FC, useEffect } from "react";
import {
  useHistory,
  useLocation,
  withRouter,
  useParams,
} from "react-router-dom";

const HeroPage: FC = () => {
  const location = useLocation();
  const { heroName, heroId } =
    useParams<{ heroName?: string; heroId?: string }>();

  useEffect(() => {}, []);
  return <p>{`Hero ${heroName} Page`}</p>;
};

export default withRouter(HeroPage);
