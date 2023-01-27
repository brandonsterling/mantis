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

function Main() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      question: "",
      answer: "",
      type: "",
    },
  });
  const { create } = useQuestion();

  const addQuestion = async (vals) => {
    create.mutate({ question: vals });

    // setOpened(false);
  };
  return (
    <Grid.Col span={8}>
      <Card.Section p="md" inheritPadding>
        <CreateQuestionForm addQuestion={addQuestion} />
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
          {/* <Text weight="bold">Resources</Text> */}
          {/* <SimpleGrid cols={2} mt="md">
            <UnstyledButton>
              <Center>
                <Avatar src="https://logo.clearbit.com/glassdoor.com" />
              </Center>

              <Text align="center" weight="bold" size="xs" mt={7}>
                Glassdoor
              </Text>
            </UnstyledButton>
            <UnstyledButton
              component="a"
              href="https://leetcode.com/discuss/interview-question"
            >
              <Center>
                <Avatar src="https://logo.clearbit.com/leetcode.com" />
              </Center>
              <Text align="center" weight="bold" size="xs" mt={7}>
                Leetcode
              </Text>
            </UnstyledButton>
          </SimpleGrid> */}
        </Card.Section>
      </Grid.Col>
    </MediaQuery>
  );
}

function CreateQuestion() {
  return (
    <>
      <Main />
      <Side />
    </>
  );
}

export default CreateQuestion;
