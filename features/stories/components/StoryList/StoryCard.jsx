import { createStyles, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const useStyles = createStyles((theme) => ({
  item: {
    position: "relative",
    overflow: "hidden",

    "&:hover": {
      borderColor: theme.colors.blue[5],
    },
  },
  active: {
    backgroundColor: theme.colors.blue[0],
    borderColor: theme.colors.blue[5],
    boxShadow: theme.shadows.xs,

    // "&::before": {
    //   content: '""',
    //   position: "absolute",
    //   top: 0,
    //   bottom: 0,
    //   left: 0,
    //   width: 6,
    //   backgroundColor: theme.colors.orange[5],
    // },
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

function StoryCard({ story, selected, ...props }) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const { id } = router.query;
  return (
    <Paper
      className={cx(classes.item, {
        [classes.active]: selected && selected == story.id,
      })}
      withBorder
      radius="sm"
      m="md"
      p="sm"
      {...props}
    >
      <Text fw={500}>{story.title}</Text>
      <Text size="sm" color="dimmed" lineClamp={2}>
        {cleanText(story.content)}
      </Text>
    </Paper>
  );
}

export { StoryCard, AddStoryCard };
