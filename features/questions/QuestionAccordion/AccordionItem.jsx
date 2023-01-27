import { Accordion, createStyles } from "@mantine/core";
import React from "react";
import { RTE } from "../../../components/RTE";

const useStyles = createStyles((theme) => ({
  rteRoot: {
    border: `1px solid transparent`,
  },
  rteContent: {
    // color: theme.colors.gray[6],
    padding: "0px",
  },
}));

function RTEPanel({ content }) {
  const { classes } = useStyles();
  return (
    <Accordion.Panel>
      <RTE
        classNames={{ root: classes.rteRoot, content: classes.rteContent }}
        editable={false}
        content={content}
      />
    </Accordion.Panel>
  );
}

export default RTEPanel;
