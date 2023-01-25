import { useState } from "react";
import { Modal, Button, Group, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BsPlusLg } from "react-icons/bs";

function NewJobModal({ lists }) {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      role: "",
      company: "",
      url: "",
      location: "",
      status: "",
    },
  });

  const handleSubmit = () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        role: form.values.role,
        company: form.values.company,
      }),
    };
    fetch("/api/application", requestOptions)
      .then((response) => response.json())
      .then((newApp) => {
        const listOrder = lists[1].apps;
        listOrder.push(newApp.id.toString());
        console.log(listOrder);
        const requestOptions = {
          method: "PUT",
          body: JSON.stringify({
            id: lists[1].id,
            apps: listOrder,
          }),
        };
        fetch("/api/lists", requestOptions);
      });
    setOpened(!opened);
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a new job"
        padding="xl"
      >
        <Stack spacing="xl">
          <TextInput
            label="Role"
            placeholder="Job title"
            name="role"
            variant="filled"
            {...form.getInputProps("role")}
          />
          <TextInput
            label="Company"
            placeholder="Company name"
            name="company"
            variant="filled"
            {...form.getInputProps("company")}
          />
          <TextInput
            label="Application URL"
            placeholder="URL for original job listing"
            name="url"
            variant="filled"
            {...form.getInputProps("url")}
          />

          <Group position="right">
            <Button variant="outline" onClick={() => setOpened(false)}>
              Cancel
            </Button>

            <Button onClick={() => handleSubmit()}>Save Job</Button>
          </Group>
        </Stack>
      </Modal>

      <Button
        leftIcon={<BsPlusLg />}
        size="xs"
        style={{ backgroundColor: "#15be53" }}
        onClick={() => setOpened(!opened)}
      >
        Add new
      </Button>
    </>
  );
}

export default NewJobModal;
