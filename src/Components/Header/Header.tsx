import React, { FC } from "react";
import { Box, Input } from "@material-ui/core";

const Header: FC = () => {
  return (
    <header>
      <Box>
        <Input placeholder="Enter hero name" fullWidth={true} color="primary" />
      </Box>
    </header>
  );
};

export default Header;
