import {
  Modal,
  Textarea,
  Radio,
  Stack,
  Group,
  Button,
  Box,
  createStyles,
  SimpleGrid,
  Flex,
  UnstyledButton,
  Checkbox,
  Text,
  Input,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { useQuestion } from "../../../hooks/useQuestion";
import CreateQuestionForm from "../CreateQuestionForm";

const useStyles = createStyles((theme) => ({
  button: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "background-color 150ms ease, border-color 150ms ease",
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.white,
  },
  body: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
}));

function RadioCard({ value, label, type, handleChange }) {
  const { classes } = useStyles();

  return (
    <UnstyledButton
      onClick={() => handleChange("type", type)}
      className={classes.button}
    >
      <Checkbox
        checked={value == type}
        onChange={() => {}}
        tabIndex={-1}
        styles={{ input: { cursor: "pointer" } }}
      />
      <div className={classes.body}>
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {label}
        </Text>
      </div>
    </UnstyledButton>
  );
}

function NewQuestionModal({ appId }) {
  const [opened, setOpened] = useState(false);
  const { create } = useQuestion();
  const form = useForm({
    initialValues: {
      question: "",
      answer: "",
      type: "",
    },
    validate: {
      question: (value) =>
        value.length < 2 ? "Please provide the quesiton above" : null,
    },
  });

  const addQuestion = async (vals) => {
    create.mutate({ question: vals, appId: appId });

    setOpened(false);
  };
  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Question"
      >
        <CreateQuestionForm addQuestion={addQuestion} />
      </Modal>
      <Button
        size="xs"
        compact
        color="dark"
        variant="outline"
        onClick={() => setOpened(true)}
      >
        + New
      </Button>
    </>
  );
}

export default NewQuestionModal;
