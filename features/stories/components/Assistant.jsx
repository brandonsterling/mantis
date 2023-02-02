import {
  Button,
  Card,
  Checkbox,
  CheckIcon,
  Grid,
  Select,
  Stack,
  Stepper,
  Text,
  Tooltip,
} from "@mantine/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaUndo } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

function Assistant({ form }) {
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState("");

  const handleClick = async () => {
    setCurrent(form.values.content);
    const content = form.values.content;
    setLoading(true);
    const response = await fetch("/api/story-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        description: content,
      }),
    });
    const res = await response.json();
    form.setFieldValue("content", `${res.result}`);
    setLoading(false);
  };

  const isChecked = (value) => {
    if (form) {
      if (value == "title") {
        return form.values.title.length > 10;
      }
      if (value == "content") {
        return form.values.content.length > 10;
      }
    } else {
      return false;
    }
  };
  const [active, setActive] = useState(0);

  const handleUndo = () => {
    form.setFieldValue("content", current);
    setCurrent("");
  };

  useEffect(() => {
    if (form.values.title.length > 10 && form.values.content.length > 10) {
      setActive(2);
    } else if (form.values.title.length > 10) {
      setActive(1);
    } else {
      setActive(0);
    }
  }, [form.values]);

  return (
    <Grid.Col sx={{ height: "500px" }} span={4}>
      <Card.Section p="md" inheritPadding>
        <Stack>
          <Text size="md" weight={600}>
            AI Assistant
          </Text>

          <Stepper size="sm" active={active} orientation="vertical">
            <Stepper.Step
              label="Title"
              description="Add a title for your story"
            />
            <Stepper.Step
              label="Experience"
              description="Provide some bulletpoints about your experience to generate a story"
            />
          </Stepper>
          <Button
            disabled={!isChecked("content") || !isChecked("title")}
            variant="outline"
            color="blue"
            loading={loading}
            onClick={() => handleClick()}
            leftIcon={<HiOutlineSparkles />}
          >
            Generate suggestion
          </Button>
          {current && !loading && (
            <Button
              leftIcon={<FaUndo />}
              variant="outline"
              color="dark"
              onClick={() => handleUndo()}
            >
              Undo
            </Button>
          )}
        </Stack>
      </Card.Section>
    </Grid.Col>
  );
}

export default Assistant;
