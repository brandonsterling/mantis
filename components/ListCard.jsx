import { createStyles, Paper, Text } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  item: {
    position: "relative",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.03)",

      borderColor: theme.colors.green[5],
    },
  },
  active: {
    backgroundColor: theme.colors.green[1],
    borderColor: theme.colors.green[5],
    boxShadow: theme.shadows.xs,
  },
}));

function AddStoryCard({ ...props }) {
  const { classes, cx } = useStyles();
  return (
    <Paper className={classes.item} withBorder radius="md" p="sm" {...props}>
      <Text ml="sm">Add a new story</Text>
    </Paper>
  );
}

function cleanText(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

function ListCard({ id, title, content, selectedId, ...props }) {
  const { classes, cx } = useStyles();
  return (
    <Paper
      className={cx(classes.item, {
        [classes.active]: selectedId && selectedId == id,
      })}
      withBorder
      radius="sm"
      m="md"
      p="sm"
      {...props}
    >
      <Text fw={500}>{title}</Text>
      <Text size="sm" color="dimmed" lineClamp={2}>
        {cleanText(content)}
      </Text>
    </Paper>
  );
}

export { ListCard, AddStoryCard };
