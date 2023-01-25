import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  TextInput,
  Box,
  Stack,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { BsPlusLg } from "react-icons/bs";

function AddApplication({ innerProps, context, id }) {
  const form = useForm({
    initialValues: {
      role: "",
      company: "",
      url: "",
      location: "",
      status: innerProps.status,
    },
  });

  const handleSubmit = () => {
    console.log("submitting");
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        role: form.values.role,
        company: form.values.company,
        status: form.values.status,
        priority: innerProps.position,
      }),
    };
    fetch("/api/applications", requestOptions).then((response) =>
      context.closeModal(id)
    );
  };

  return (
    <>
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
        <Select
          label="Status"
          name="status"
          variant="filled"
          data={[
            { value: "On Hold", label: "On Hold" },
            { value: "Interviewing", label: "Interviewing" },
            { value: "Offer/Rejection", label: "Offer/Rejection" },
            { value: "Waiting to Apply", label: "Waiting to Apply" },
          ]}
          {...form.getInputProps("status")}
        />

        <Group position="right">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>

          <Button onClick={() => handleSubmit()}>Save Job</Button>
        </Group>
      </Stack>
    </>
  );
}

export default AddApplication;
