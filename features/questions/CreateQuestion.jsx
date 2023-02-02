import {
  Avatar,
  Button,
  Card,
  Center,
  Container,
  Grid,
  MediaQuery,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import React from "react";
import FormCard from "../../components/FormCard";
import { useQuestion } from "../../hooks/useQuestion";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useRouter } from "next/router";
import CreateQuestionForm from "./CreateQuestionForm";
import ResourcesGrid from "../../components/ResourcesGrid";
import Assistant from "./components/Assistant";

function Main({ form, addQuestion }) {
  const router = useRouter();

  return (
    <Grid.Col mr="xl" span={7}>
      <Card.Section p="md" inheritPadding>
        <CreateQuestionForm form={form} addQuestion={addQuestion} />
      </Card.Section>
    </Grid.Col>
  );
}
function Side() {
  return (
    <MediaQuery smallerThan="xl" styles={{ display: "none" }}>
      <Grid.Col sx={{ height: "500px" }} span={4}>
        <Card.Section p="md" inheritPadding>
          <ResourcesGrid />
        </Card.Section>
      </Grid.Col>
    </MediaQuery>
  );
}

function CreateQuestion() {
  const { create } = useQuestion();

  const form = useForm({
    initialValues: {
      question: "",
      answer: "",
      type: undefined,
    },
    validate: {
      question: (value) =>
        value.length < 2 ? "Please provide a question above" : null,
      type: (value) =>
        value == undefined
          ? "Please choose who will be asking the question"
          : null,
    },
  });

  const addQuestion = async (vals) => {
    create.mutate({ question: vals });
  };
  return (
    <>
      <Main form={form} addQuestion={addQuestion} />
      <Assistant form={form} />
      {/* <Side /> */}
    </>
  );
}

export default CreateQuestion;
