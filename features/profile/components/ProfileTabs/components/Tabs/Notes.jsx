import {
  Stack,
  createStyles,
  Button,
  Divider,
  Textarea,
  Group,
  Modal,
  Tabs,
} from "@mantine/core";
import React, { useState } from "react";
import TabPanelHeader from "./TabPanelHeader";
import NoteCard from "../Cards/NoteCard";
import { useForm } from "@mantine/form";

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
}));

function ModalContent({ appId }) {
  const form = useForm({
    initialValues: {
      content: "",
    },
  });
  const [opened, setOpened] = useState(false);

  const addNote = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        content: form.values.content,
        applicationId: parseInt(appId),
      }),
    };
    const res = await fetch(`/api/notes`, requestOptions).then((result) =>
      console.log(result)
    );
    setOpened(false);
  };
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Story">
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
            onClick={() => addNote()}
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

function Notes({ appId, notes }) {
  const { classes } = useStyles();

  if (!notes) {
    return;
  }
  const listItems = notes.map((note) => (
    <NoteCard content={note} appId={appId} />
  ));

  return (
    <Tabs.Panel value="notes" pt="xs">
      <TabPanelHeader
        name="Notes"
        description="Use this place to leave whatever notes you want"
        action={<ModalContent appId={appId} />}
      ></TabPanelHeader>
      <Stack>{listItems}</Stack>
    </Tabs.Panel>
  );
}

export default Notes;
