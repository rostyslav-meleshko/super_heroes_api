import React, { FC } from "react";
import { Box, Input, useMediaQuery } from "@material-ui/core";

const Header: FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <header>
      <Box maxWidth={isMobile ? "sm" : "lg"} px="24px" pb="6px">
        <Input placeholder="Enter hero name" fullWidth={true} color="primary" />
      </Box>
    </header>
  );
};

export default Header;
