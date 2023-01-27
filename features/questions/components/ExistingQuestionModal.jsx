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
  Accordion,
  Badge,
  Table,
  ScrollArea,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { QUESTION_STATES } from "../../../constants/questions";
import { useQuestion } from "../../../hooks/useQuestion";
import { useQuestions } from "../../../hooks/useQuestions";
import QuestionAccordion from "../QuestionAccordion/QuestionAccordion";

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
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

function ExistingQuestionModal({ appId, data }) {
  const { classes, cx } = useStyles();
  const { questions: allQuestions } = useQuestions();

  const [opened, setOpened] = useState(false);
  const { create } = useQuestion();

  const addQuestion = async () => {
    create.mutate({ question: form.values, appId: appId });

    setOpened(false);
  };

  const [selection, setSelection] = useState(
    data.questions.map((item) => item.id)
  );
  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === allQuestions.data.length
        ? []
        : allQuestions.data.map((item) => item.id)
    );

  if (allQuestions.isLoading) return <div>loading..</div>;

  const rows = allQuestions.data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Text size="sm" weight={500}>
            {item.question}
          </Text>
        </td>
        <td>
          <Badge
            sx={{ maxWidth: "50%" }}
            fullWidth
            size="md"
            variant="outline"
            color="dark"
          >
            {QUESTION_STATES[item.type]}
          </Badge>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Modal
        centered
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Link questions"
      >
        {/* <Accordion multiple={true}>
          {data.questions.map((question, index) => {
            return (
              <Accordion.Item key={question.id} value={question.id}>
                <Accordion.Control>
                  <Group position="apart">
                    <Group>
                      <Checkbox onClick={(e) => e.stopPropagation()} />
                      <Text> {question.question}</Text>
                    </Group>
                    <Badge size="sm" variant="outline" color="dark">
                      {QUESTION_STATES[question.type]}
                    </Badge>
                  </Group>
                </Accordion.Control>
              </Accordion.Item>
            );
          })}
        </Accordion> */}
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === allQuestions.data.length}
                    indeterminate={
                      selection.length > 0 &&
                      selection.length !== data.questions.length
                    }
                  />
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>

        <Group position="apart">
          <Text>{selection.length} selected</Text>
          <Button
            position="right"
            mt="md"
            compact
            color="green"
            onClick={() => addQuestion()}
          >
            Link
          </Button>
        </Group>
      </Modal>
      <Button
        variant="outline"
        size="xs"
        compact
        color="dark"
        onClick={() => setOpened(true)}
      >
        Link Existing
      </Button>
    </>
  );
}

export default ExistingQuestionModal;
