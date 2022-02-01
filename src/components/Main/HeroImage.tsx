import React, { FC, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

type PropsHeroImage = {
  heroName: string;
  avatarSrc: string;
};
export const HeroImage: FC<PropsHeroImage> = ({ heroName, avatarSrc }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {isLoaded ? null : (
        <Skeleton
          style={{ margin: "auto" }}
          animation="pulse"
          variant="circle"
          width={"70%"}
          height={"70%"}
        />
      )}

      <img
        style={isLoaded ? {} : { display: "none" }} // TODO css in js;
        src={`${avatarSrc}`}
        onLoad={(): void => {
          setIsLoaded(true);
        }}
        alt={`${heroName} avatar`}
        title={heroName}
        width="100%"
      />
    </>
  );
};
