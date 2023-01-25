import { createStyles, TextInput } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  root: {
    border: "1px solid transparent",
    padding: "0px",

    // "&:hover": {
    //   border: "1px solid lightgray",
    //   borderRadius: "5px",
    // },
    borderRadius: "5px",
  },
}));

function PlainTextInputContainer(props) {
  const { classes, cx } = useStyles();
  return <TextInput variant="unstyled" className={classes.root} {...props} />;
}

export default PlainTextInputContainer;
