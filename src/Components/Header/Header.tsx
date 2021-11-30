import React, { FC } from "react";
import { Container, Input, useMediaQuery } from "@material-ui/core";

const Header: FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <header>
      <Container maxWidth={isMobile ? "sm" : "lg"}>
        <Input placeholder="Enter hero name" fullWidth={true} color="primary" />
        {isMobile && <p> mobile </p>}
      </Container>
    </header>
  );
};

export default Header;
