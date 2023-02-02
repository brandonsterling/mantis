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

function GenerateAI({ form, ...props }) {
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

  const handleUndo = () => {
    form.setFieldValue("answer", current);
    setCurrent("");
  };

  return (
    <>
      <Button
        {...props}
        // className={classes.glowingbutton}
        disabled={!isChecked("answer") || !isChecked("question")}
        // variant="default"
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
          compact
          onClick={() => handleUndo()}
        >
          Undo
        </Button>
      )}
    </>
  );
}

export default GenerateAI;
