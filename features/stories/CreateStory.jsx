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
import { useStory } from "../../hooks/useStory";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useRouter } from "next/router";

function Main() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
  });
  const { create } = useStory();

  return (
    <Grid.Col span={8}>
      <Card.Section p="md" inheritPadding>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Title"
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Content"
            placeholder="Content"
            {...form.getInputProps("content")}
          />

          <Button onClick={() => create.mutate(form.values)}>Submit</Button>
        </Stack>
      </Card.Section>
    </Grid.Col>
  );
}
function Side() {
  return (
    <MediaQuery smallerThan="xl" styles={{ display: "none" }}>
      <Grid.Col sx={{}} span={4}>
        <Card.Section p="md" inheritPadding>
          <Text weight="bold">Resources</Text>
          <SimpleGrid cols={2} mt="md">
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
          </SimpleGrid>
        </Card.Section>
      </Grid.Col>
    </MediaQuery>
  );
}

function CreateStory() {
  return (
    <>
      <Main />
      <Side />
    </>
  );
}

export default CreateStory;
