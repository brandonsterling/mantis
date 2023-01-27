import {
  Button,
  Card,
  CardSection,
  CloseButton,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useInputState } from "@mantine/hooks";

function QuestionModal({ context, id, innerProps }) {
  const [question, setQuestion] = useInputState("");
  const [answer, setAnswer] = useInputState("");

  const createQuestion = async () => {
    const appId = innerProps.data.id;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        question: question,
        answer: answer,
        applicationId: appId,
      }),
    };
    const res = await fetch(`/api/questions`, requestOptions).then((result) =>
      context.closeModal(id)
    );
    return res;
  };
  return (
    <>
      <Card>
        <Card.Section inheritPadding>
          <CloseButton aria-label="Close modal" />
        </Card.Section>
        <Card.Section inheritPadding py="md">
          <Stack>
            <TextInput
              value={question}
              onChange={setQuestion}
              placeholder="Your question"
            />
            <Textarea
              value={answer}
              onChange={setAnswer}
              placeholder="Your answer"
            />
          </Stack>
        </Card.Section>
        <Card.Section withBorder inheritPadding pt="xs">
          <Button size="xs" onClick={() => createQuestion()}>
            Create question
          </Button>
        </Card.Section>
      </Card>
    </>
  );
}

export default QuestionModal;
