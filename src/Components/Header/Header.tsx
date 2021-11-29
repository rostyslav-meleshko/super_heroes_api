import React, { FC } from "react";
import { Container, Input } from "@material-ui/core";

type PropsHeader = {
  isMobile: boolean;
};

const Header: FC<PropsHeader> = ({ isMobile }) => {
  return (
    <header>
      <Container maxWidth={isMobile ? "sm" : "lg"}>
        SuperHeroes
        <Input placeholder="Enter hero name" fullWidth={true} color="primary" />
        {isMobile && <p> mobile </p>}
      </Container>
    </header>
  );
};

export default Header;
