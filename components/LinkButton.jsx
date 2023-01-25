import { Button, createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    paddingLeft: 0,
  },
}));

function LinkButton({ onClick, children, ...rest }) {
  const { classes } = useStyles();
  return (
    <Button
      onClick={onClick}
      {...rest}
      classNames={{ root: classes.root }}
      variant="subtle"
    >
      {children}
    </Button>
  );
}

export default LinkButton;
