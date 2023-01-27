import {
  Stack,
  createStyles,
  Spoiler,
  Title,
  TextInput,
  SimpleGrid,
  Button,
  Textarea,
  Highlight,
  Text,
  Modal,
  ActionIcon,
  Input,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useForm } from "@mantine/form";
import CompanySearch from "../../components/CompanySearch";
import { useApplication } from "../../hooks/useApplication";
import { useApplications } from "../../hooks/useApplications";
import { RTE } from "../../components/RTE";
const useStyles = createStyles((theme) => ({
  root: {
    // border: "1px solid transparent",
  },
  content: {
    // padding: 0,
    fontSize: theme.fontSizes.sm,
  },
}));

function AddAppModal() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const { applications } = useApplications();

  const { create } = useApplication();
  const form = useForm({
    initialValues: {
      role: "",
      link: "",
      description: "",
      company: "",
      logo: "",
    },
  });

  const handleSubmit = (values) => {
    const newApp = {
      role: values.role,
      link: values.link,
      description: values.description,
      logo: values.logo,
      company: values.company,
      status: "Bookmarked",
    };
    create.mutate(newApp);
    setOpened(false);
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        {applications?.data?.length >= 100 ? (
          <Text>Sign up to create more apps</Text>
        ) : (
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack spacing="xl">
              <SimpleGrid
                spacing="lg"
                cols={2}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              >
                <CompanySearch form={form} />
                <TextInput
                  {...form.getInputProps("role")}
                  placeholder="Chief of Cats"
                  label="Role"
                />
              </SimpleGrid>

              <TextInput
                {...form.getInputProps("link")}
                placeholder="Add URL"
                label="Post link"
              />
              <div>
                <Input.Wrapper
                  {...form.getInputProps("description")}
                  label="Job description"
                >
                  <RTE
                    form={form}
                    content=""
                    fieldName="description"
                    classNames={{
                      content: classes.content,
                      root: classes.root,
                    }}
                  />
                </Input.Wrapper>
                {/* <Textarea
                  minRows={5}
                  label="Description"
                  autosize
                  {...form.getInputProps("description")}
                /> */}
              </div>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        )}
      </Modal>
      <ActionIcon onClick={() => setOpened(true)}>
        <BsPlusLg size={10} />
      </ActionIcon>
    </>
  );
}

export default AddAppModal;
