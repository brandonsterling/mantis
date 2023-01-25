import { createStyles, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const useStyles = createStyles((theme) => ({
  item: {
    position: "relative",
    boxShadow: theme.shadows.xs,
    overflow: "hidden",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
  active: {
    backgroundColor: theme.colors.blue[0],
    borderColor: theme.colors.blue[5],
    border: `1px solid ${theme.colors.blue[5]}`,

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundColor: theme.colors.blue[5],
    },
  },
}));

function AddQuestionCard({ ...props }) {
  const { classes, cx } = useStyles();
  return (
    <Paper
      className={classes.item}
      withBorder
      radius="md"
      m="md"
      p="sm"
      {...props}
    >
      <Text ml="sm">Add a new question</Text>
    </Paper>
  );
}

function QuestionCard({ question, selected, ...props }) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const { id } = router.query;
  return (
    <Paper
      className={cx(classes.item, {
        [classes.active]: id && id[0] == question.id,
      })}
      withBorder
      radius="md"
      m="md"
      p="sm"
      {...props}
    >
      <Text ml="sm">{question.question}</Text>
    </Paper>
  );
}

export { QuestionCard, AddQuestionCard };
