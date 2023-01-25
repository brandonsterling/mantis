"use client";
import {
  Box,
  createStyles,
  Grid,
  Paper,
  Title,
  SegmentedControl,
  Text,
  ScrollArea,
  Container,
  Card,
  Accordion,
  Stack,
  Checkbox,
  Select,
  Group,
  ActionIcon,
  Menu,
  Button,
  TextInput,
  Textarea,
  Modal,
} from "@mantine/core";
import React, { useState, useRef } from "react";
import { jobsData } from "../../../constants/jobs";
import JobTabs from "../../profile/components/ProfileTabs/ProfileTabs";
import Job from "../../kanban/components/Job";
import DetailAccordion from "../../../components/DetailAccordion";
import Link from "next/link";
import LinkButton from "../../../components/LinkButton";
import { useInputState } from "@mantine/hooks";
import { MdOutlineAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: 50,
    height: "100%",
  },
  title: {
    marginBottom: 20,
    marginTop: 50,
  },
  wrapper: {
    paddingLeft: 20,
    borderLeft: `1px solid ${theme.colors.gray[1]}`,
  },
}));

function Taskboxes({ task }) {
  const [checked, setChecked] = useInputState(false);
  return (
    <Checkbox
      td={checked ? "line-through" : ""}
      value={checked}
      onChange={setChecked}
      label={task.content}
    />
  );
}

function ModalContent({ appId }) {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      content: "",
    },
  });

  const addTask = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        content: form.values.content,
        applicationId: appId,
      }),
    };
    const res = await fetch(`/api/tasks`, requestOptions).then((result) =>
      console.log(result)
    );
  };
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Task">
        <Stack>
          <Textarea
            autosize
            withAsterisk
            label="Content"
            placeholder="Enter note here here"
            {...form.getInputProps("content")}
          />
        </Stack>
        <Group position="right">
          <Button
            position="right"
            mt="md"
            compact
            color="green"
            onClick={() => addTask()}
          >
            Create
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
        Add
      </Button>
    </>
  );
}

function Tasks({ data }) {
  const { classes } = useStyles();
  const router = useRouter();
  const { id } = router.query;

  if (!data) {
    return;
  }

  const tasks = data.tasks.map((task, index) => <Taskboxes task={task} />);

  return (
    <Box>
      <Stack>
        <Card withBorder>
          <Card.Section withBorder inheritPadding py="xs">
            <Group position="apart">
              <Text weight={500}>Tasks</Text>
              <ModalContent appId={id} />
            </Group>
          </Card.Section>
          <Card.Section inheritPadding py="xs">
            {tasks}
          </Card.Section>
        </Card>
      </Stack>
    </Box>
  );
}

export default Tasks;
