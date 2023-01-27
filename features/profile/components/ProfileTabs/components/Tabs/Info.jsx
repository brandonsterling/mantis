import {
  Stack,
  createStyles,
  Title,
  TextInput,
  SimpleGrid,
  Textarea,
  Tabs,
  Input,
  Text,
  Badge,
  Group,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import CompanySearch from "../../../../../../components/CompanySearch";
import { RTE } from "../../../../../../components/RTE";
import TabPanelHeader from "./TabPanelHeader";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { useApplication } from "../../../../../../hooks/useApplication";

const useStyles = createStyles((theme) => ({
  root: {
    border: "1px solid lightgray",
  },
  content: {
    padding: "12px",
    // padding: 0,
    fontSize: theme.fontSizes.xs,
  },
}));

function Info({ appId, application }) {
  const { classes } = useStyles();
  const { update } = useApplication();

  const form = useForm({
    initialValues: {
      role: application.role,
      link: application.link,
      description: application.description,
      applied_at: new Date(application.applied_at),
      company: application.company,
      logo: application.logo,
    },
  });

  const [debounced] = useDebouncedValue(form.values, 1000);

  useEffect(() => {
    if (form.isDirty()) {
      const app = {
        role: form.values.role,
        link: form.values.link,
        description: form.values.description,
        logo: form.values.logo,
        company: form.values.company,
        applied_at: form.values.applied_at,
      };

      if (form.isDirty("company") && !form.isDirty("logo")) {
        app.logo = "";
      }
      update.mutate({ appId: application.id, app: app });

      form.resetDirty();
    }
  }, [debounced]);

  return (
    <Tabs.Panel value="info" pt="xs">
      <TabPanelHeader
        name="Job information"
        description="Share info about the job"
      />

      <Stack spacing="xl">
        <SimpleGrid
          spacing="lg"
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <CompanySearch form={form} company={application} />
          <TextInput
            {...form.getInputProps("role")}
            placeholder="Chief of Cats"
            label="Role"
          />
        </SimpleGrid>
        <SimpleGrid
          spacing="lg"
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <TextInput
            {...form.getInputProps("link")}
            placeholder="Add URL"
            label="Post link"
          />
          <DatePicker
            withinPortal
            {...form.getInputProps("applied_at")}
            placeholder="Pick date"
            label="Applied date"
          />
        </SimpleGrid>
        <div>
          <Input.Wrapper id="input-demo" label="Description">
            {application?.keywords && (
              <Group my="md" spacing="xs">
                {application?.keywords?.split(",").map((word) => {
                  return <Badge>{word}</Badge>;
                })}
              </Group>
            )}
            <RTE
              form={form}
              content={application.description}
              fieldName="description"
              classNames={{ content: classes.content, root: classes.root }}
            />
          </Input.Wrapper>
        </div>
      </Stack>
    </Tabs.Panel>
  );
}

export default Info;
