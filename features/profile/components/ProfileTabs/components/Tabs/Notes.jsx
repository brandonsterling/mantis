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
import { useNote } from "../../../../../../hooks/useNote";
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
  const { create } = useNote();
  const form = useForm({
    initialValues: {
      content: "",
    },
  });
  const [opened, setOpened] = useState(false);

  const addNote = async () => {
    create.mutate({ note: form.values, appId: appId });

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
        + New
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
