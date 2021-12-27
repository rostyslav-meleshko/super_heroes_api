import React, { FC } from "react";
import { Container, Typography } from "@material-ui/core";

type ErrorMessageProps = {
  text: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  return (
    <Container>
      <Typography variant="h4" align="center" color="error">
        {text}
      </Typography>
    </Container>
  );
};

export default ErrorMessage;
