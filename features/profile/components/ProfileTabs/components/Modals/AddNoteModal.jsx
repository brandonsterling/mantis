import { Stack, Group, Button, Textarea, Modal } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";

export function AddNoteModal({ note, appId, action, onSubmit, hovered }) {
  const form = useForm({
    initialValues: {
      content: note ? note.content : "",
    },
  });
  const [opened, setOpened] = useState(false);

  const addNote = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        content: form.values.content,
        appId: appId ? appId : undefined,
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
            onClick={() => onSubmit(form.values.content)}
          >
            Submit
          </Button>
        </Group>
      </Modal>
      {hovered && (
        <Button
          variant="outline"
          size="xs"
          compact
          color="dark"
          onClick={() => setOpened(true)}
        >
          {action}
        </Button>
      )}
    </>
  );
}
