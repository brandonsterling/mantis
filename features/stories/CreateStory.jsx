import {
  Avatar,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Input,
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
import Assistant from "./components/Assistant";
import { RTE } from "../../components/RTE";

function Main({ form }) {
  const router = useRouter();

  const { create } = useStory();

  return (
    <Grid.Col mr="xl" span={7}>
      <Card.Section p="md" inheritPadding>
        <Stack>
          <TextInput
            fontSize="16px"
            label="Story Title"
            placeholder="Increased sales by 20%"
            {...form.getInputProps("title")}
          />

          <Input.Wrapper label="Experience">
            {/* <RTE
              placeholder={"Led a team of 5 to increase sales by 20%"}
              form={form}
              styles={{ fontSize: "14px" }}
              content={form.values.content}
              fieldName="content"
            /> */}
            <Textarea
              autosize
              minRows={6}
              {...form.getInputProps("content")}
              placeholder={
                "Designed a new feature that increased the conversion rate by 100%"
              }
            />
          </Input.Wrapper>

          <Button onClick={() => create.mutate(form.values)}>Create</Button>
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
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
  });
  return (
    <>
      <Main form={form} />
      {/* <Side /> */}
      <Assistant form={form} />
    </>
  );
}

export default CreateStory;
