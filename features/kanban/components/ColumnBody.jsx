import {
  Stack,
  Flex,
  Title,
  createStyles,
  Box,
  Group,
  Badge,
  Divider,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "calc(100vh - 250px)",
    // maxHeight: "100%",
    borderRadius: 10,
    marginTop: 5,
  },

  draggingOver: {
    backgroundColor: theme.colors.gray[2],
  },
}));

function ColumnBody({ children, isDraggingOver }) {
  const { classes, cx } = useStyles();
  return (
    <Flex
      px={10}
      direction="column"
      className={cx(classes.wrapper, {
        [classes.draggingOver]: isDraggingOver,
      })}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {children}
      </div>
    </Flex>
  );
}

export default ColumnBody;
