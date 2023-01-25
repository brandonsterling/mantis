import React from "react";
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
import { useQuestion } from "../../hooks/useQuestion";

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
function CreateQuestionForm({ addQuestion }) {
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

  return (
    <form
      onSubmit={form.onSubmit(() => {
        addQuestion(form.values), form.reset();
      })}
    >
      <Stack>
        <Textarea
          autosize
          withAsterisk
          label="Question"
          placeholder="enter a title here"
          {...form.getInputProps("question")}
        />
        <Textarea
          autosize
          label="Answer"
          placeholder="enter content here"
          {...form.getInputProps("answer")}
        />

        <Input.Wrapper label="Choose who will be asking this question">
          <SimpleGrid mt="sm" cols={2}>
            <RadioCard
              handleChange={form.setFieldValue}
              value={form.values.type}
              label="You"
              type="ask"
            />
            <RadioCard
              handleChange={form.setFieldValue}
              value={form.values.type}
              label="Interviewer"
              type="answer"
            />
          </SimpleGrid>
        </Input.Wrapper>
      </Stack>

      <Group position="right">
        <Button fullWidth position="right" mt="xl" color="green" type="Submit">
          Create
        </Button>
      </Group>
    </form>
  );
}

export default CreateQuestionForm;
