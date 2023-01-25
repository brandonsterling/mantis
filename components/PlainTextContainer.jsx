import { createStyles, Textarea } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  root: {
    padding: "0px",
    // "&:hover": {
    //   border: "1px solid lightgray",
    //   borderRadius: "5px",
    // },
    borderRadius: "5px",
  },
}));

function PlainTextContainer(props) {
  const { classes, cx } = useStyles();
  return <Textarea variant="unstyled" className={classes.root} {...props} />;
}

export default PlainTextContainer;
