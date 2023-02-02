import {
  Button,
  Card,
  Checkbox,
  CheckIcon,
  Grid,
  createStyles,
  keyframes,
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

const bounce = keyframes({
  //   "0%": { borderColor: "#228BE6" },
  //   "50%": { borderColor: "#DA77F2" },
  "100%": { transform: `rotate(1turn)` },
});

const useStyles = createStyles((theme) => ({
  glowingbutton: {
    borderRadius: "10px",
    position: "relative",
    zIndex: 0,
    width: 400,
    height: 300,
    margin: 20,
    overflow: "hidden",
    padding: "2rem",
    "&:before": {
      content: '""',
      position: "absolute",
      zIndex: -2,
      left: "-50%",
      top: "-50%",
      width: "200%",
      height: "200%",
      backgroundColor: "#1a232a",
      backgroundRepeat: "no-repeat",
      backgroundImage:
        "conic-gradient(transparent,rgba(168, 239, 255, 1), transparent 30%)",
      animation: `${bounce} 4s linear infinite`,
    },
    "&:after": {
      content: '""',
      position: "absolute",
      zIndex: -1,
      left: "6px",
      top: "6px",
      width: "calc(100% - 12px)",
      height: "calc(100% - 12px)",
      background: "#000",
      borderRadius: "5px",
    },
  },
}));

function Assistant({ form }) {
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState("");
  const { classes } = useStyles();
  const handleClick = async () => {
    setCurrent(form.values.answer);
    const description = form.values.answer;
    setLoading(true);
    const response = await fetch("/api/question-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question: form.values.question,
        description: description,
      }),
    });
    const res = await response.json();
    form.setFieldValue("answer", `${res.result}`);
    setLoading(false);
  };

  const isChecked = (value) => {
    if (value == "question") {
      return form.values.question.length > 10;
    }
    if (value == "answer") {
      return form.values.answer.length > 10;
    }
  };
  const [active, setActive] = useState(0);

  const handleUndo = () => {
    form.setFieldValue("answer", current);
    setCurrent("");
  };

  useEffect(() => {
    if (form.values.question.length > 10 && form.values.answer.length > 10) {
      setActive(2);
    } else if (form.values.question.length > 10) {
      setActive(1);
    } else {
      setActive(0);
    }
  }, [form.values]);

  return (
    <Grid.Col
      sx={{
        height: "100%",
        position: "sticky",
        top: "0px",
      }}
      span={4}
    >
      <Card.Section p="md" inheritPadding>
        <Stack>
          <Text size="md" weight={600}>
            AI Assistant
          </Text>

          <Stepper size="xs" active={active} orientation="vertical">
            <Stepper.Step
              label="Question"
              description="Add a question for yourself or an interviewer "
            />
            <Stepper.Step
              label="Answer"
              description="Provide some bulletpoints about your experience to generate an answer"
            />
          </Stepper>
          <Button
            // className={classes.glowingbutton}
            disabled={!isChecked("answer") || !isChecked("question")}
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
