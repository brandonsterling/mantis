import { Stack, Group, Button, Textarea, Modal } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";

export function EditModal({ content }) {
  const form = useForm({
    initialValues: {
      content: content.content,
      title: content.title,
    },
  });
  const [opened, setOpened] = useState(false);

  const updateStory = async () => {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({
        content: form.values.content,
        title: form.values.title,
      }),
    };
    // const res = await fetch(`/api/stories/${content.id}`, requestOptions).then(
    //   (result) =>
    // );
    setOpened(false);
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Story"
      >
        <Stack>
          <Textarea
            autosize
            withAsterisk
            label="Title"
            placeholder="enter a title here"
            {...form.getInputProps("title")}
          />
          <Textarea
            autosize
            withAsterisk
            label="Content"
            placeholder="enter content here"
            {...form.getInputProps("content")}
          />
        </Stack>
        <Group position="right">
          <Button
            position="right"
            mt="md"
            compact
            color="green"
            onClick={() => updateStory()}
          >
            Submit
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
        Edit
      </Button>
    </>
  );
}
