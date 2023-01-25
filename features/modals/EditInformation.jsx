import {
  Button,
  Card,
  CardSection,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { useSWRConfig } from "swr";

function EditInformation({ context, id, innerProps }) {
  const [role, setRole] = useState(innerProps.data.role);
  const [company, setCompany] = useState(innerProps.data.company);

  const [description, setDescription] = useState(innerProps.data.description);
  const { mutate } = useSWRConfig();

  const updateApp = async () => {
    const appId = innerProps.data.id;
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({
        role: role,
        description: description,
        company: company,
      }),
    };
    const res = await fetch(`/api/applications/${appId}`, requestOptions).then(
      (result) => console.log(result),
      mutate(
        `/api/applications/${appId}`,
        {
          ...innerProps.data,
          role: role,
          description: description,
          company: company,
        },
        {
          revalidate: false,
        }
      ),
      context.closeModal(id)
    );
    return res;
  };

  return (
    <>
      <Card>
        <Stack>
          <TextInput
            value={role}
            onChange={(event) => setRole(event.currentTarget.value)}
            placeholder="Job Title"
          />
          <TextInput
            value={company}
            onChange={(event) => setCompany(event.currentTarget.value)}
            placeholder="Company"
          />
          <Textarea
            value={description}
            autosize
            onChange={(event) => setDescription(event.currentTarget.value)}
            placeholder="Description"
          />
        </Stack>
        <Card.Section inheritPadding py="xs">
          <Button
            onClick={() => {
              updateApp();
            }}
          >
            Submit
          </Button>
        </Card.Section>
      </Card>
    </>
  );
}

export default EditInformation;
