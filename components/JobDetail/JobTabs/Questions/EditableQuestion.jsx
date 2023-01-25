import {
  Card,
  createStyles,
  Group,
  Button,
  Textarea,
  TextInput,
  Collapse,
} from "@mantine/core";
import React, { useState } from "react";
import { useInputState } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  item: {
    "&[data-active]": {
      backgroundColor: "transparent",
    },
  },
  control: {
    "&[data-active]": {
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  textInput: {
    border: "none",
    fontWeight: 500,
  },
  textAreaInput: {
    border: "none",
  },
}));

function EditableQuestion({ appId, toggle }) {
  const [question, setQuestion] = useInputState("");
  const [answer, setAnswer] = useInputState("");
  const [opened, setOpened] = useState(false);

  const { classes } = useStyles();

  const createQuestion = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        question: question,
        answer: answer,
        applicationId: appId,
      }),
    };
    const res = await fetch(`/api/questions`, requestOptions).then(
      (result) => console.log(result),
      toggle()
    );
    return res;
  };

  return (
    <Card sx={{ overflow: "visible" }} shadow="xl" py="xl" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group>
          <TextInput
            value={question}
            onChange={setQuestion}
            classNames={{ input: classes.textInput }}
            placeholder="Write your question here..."
            weight={500}
          />
        </Group>
        <Collapse in={opened}>
          <Textarea
            value={answer}
            onChange={setAnswer}
            classNames={{ input: classes.textAreaInput }}
            placeholder="And your answer here..."
            autosize
          />
        </Collapse>
      </Card.Section>
      <Card.Section inheritPadding py="xs">
        <Group position="apart">
          <div></div>
          {/* <Menu shadow="md" width={200} position="bottom-start">
            <Menu.Target>
              <Button variant="outline" compact size="xs">
                Company Specific
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Button variant="outline" color="red" compact size="xs">
                General
              </Button>
            </Menu.Dropdown>
          </Menu> */}
          <Group>
            <Button
              onClick={() => setOpened(!opened)}
              variant="subtle"
              size="xs"
              compact
            >
              Expand
            </Button>
            <Button onClick={() => toggle()} variant="subtle" size="xs" compact>
              Cancel
            </Button>
            <Button onClick={() => createQuestion()} size="xs" compact>
              Save
            </Button>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default EditableQuestion;
