import React, { FC } from "react";
import { Box, CircularProgress } from "@material-ui/core";

const Loader: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt="100px"
      data-testid="loader"
    >
      <CircularProgress size={200} variant="indeterminate" thickness={3} />
    </Box>
  );
};

export default Loader;
