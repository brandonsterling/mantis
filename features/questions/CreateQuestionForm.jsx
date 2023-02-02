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
import { useEffect } from "react";
import Assistant from "./components/Assistant";
import { RTE } from "../../components/RTE";

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

export function RadioCard({ value, label, type, handleChange }) {
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
function CreateQuestionForm({ addQuestion, form }) {
  const { create } = useQuestion();

  return (
    <form
      onSubmit={form.onSubmit(() => {
        addQuestion(form.values), form.reset();
      })}
    >
      <Stack>
        <Textarea
          autosize
          label="Question"
          placeholder="Write an interview question"
          {...form.getInputProps("question")}
        />

        <Input.Wrapper label="Answer">
          <RTE form={form} content={form.values.answer} fieldName="answer" />
        </Input.Wrapper>

        <Input.Wrapper
          {...form.getInputProps("type")}
          label="Choose who will be asking this question"
        >
          <SimpleGrid my="sm" cols={2}>
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
        <Button fullWidth position="right" mt="xl" type="Submit">
          Create
        </Button>
      </Group>
    </form>
  );
}

export default CreateQuestionForm;
