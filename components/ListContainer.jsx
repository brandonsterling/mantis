import { Box, createStyles, Flex, Group, Title } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  header: {
    height: 60,
    padding: "0px 18px",
    marginTop: theme.spacing.md,
  },
  list: {
    // marginBottom: "50px",
    // height: "100%",
    // overflow: "hidden",
  },
  inner: {
    marginBottom: "50px",
    // height: "800px",
    // overflow: "auto",
  },
}));

function ListContainer({ header, search, list, icon }) {
  const { classes } = useStyles();

  return (
    <>
      <Flex className={classes.header}>
        <Group>
          {icon}
          <Title order={2}>{header}</Title>
        </Group>
      </Flex>
      {search}

      <div className={classes.list}>
        <div className={classes.inner}>{list}</div>
      </div>
    </>
  );
}

export default ListContainer;
