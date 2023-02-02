import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Grid,
  Group,
  Input,
  Loader,
  MediaQuery,
  MultiSelect,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { RTE } from "../../components/RTE";
import { StoryRTE } from "./StoryRTE";
import StoryMultiSelect from "./StoryMultiSelect";
import FormCard from "../../components/FormCard";
import CreateStory from "./CreateStory";
import { useStory } from "../../hooks/useStory";
import StoryChips from "./StoryChips";
import { useForm } from "@mantine/form";
import { Content } from "../../components/FormCard/Content";
import { Side } from "../../components/FormCard/Side";
import AppMultiSelect from "../../components/AppMultiSelect";
import AddTemplate from "./components/AddTemplate";
import GenerateAI from "./components/GenerateAI";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  rteRoot: {
    border: `1px solid transparent`,

    "&:hover": {
      border: `1px solid ${theme.colors.green[5]}`,
    },
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  titleInput: {
    paddingLeft: 10,
    fontWeight: 700,
    fontSize: 26,
    lineHeight: 1.35,
    border: "1px solid transparent",

    "&:hover": {
      border: `1px solid ${theme.colors.green[5]}`,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export function StoryContent({ selected }) {
  const { classes } = useStyles();
  const { story, update } = useStory(selected);
  const { data } = story;

  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState("");

  const form = useForm({
    initialValues: {
      title: data ? data.title : "",
      content: data ? data.content : "",
    },
  });

  const [debounced] = useDebouncedValue(form.values, 1000);

  useEffect(() => {
    if (form.isDirty()) {
      let updatedStory = {
        content: form.values.content,
        title: form.values.title,
      };
      update.mutate({
        id: data.id,
        storyData: updatedStory,
      });

      form.resetDirty();
    }
  }, [debounced]);

  useEffect(() => {
    if (data && data.title !== form.values.title) {
      form.setValues({
        title: data.title,
        content: data.content,
      });
      setCurrent("");
      setLoading(false);
    }
  }, [selected, data]);

  return (
    <Content>
      {data && (
        <>
          <Stack>
            <Textarea
              label="Story Title"
              autosize
              // classNames={{
              //   input: classes.titleInput,
              //   root: classes.titleRoot,
              // }}

              {...form.getInputProps("title")}
            />

            <Input.Wrapper label="Answer">
              <RTE
                // classNames={{ root: classes.rteRoot }}
                selected={selected}
                form={form}
                content={data.content}
                fieldName="content"
                contentButton={
                  <GenerateAI
                    setLoading={setLoading}
                    setCurrent={setCurrent}
                    loading={loading}
                    current={current}
                    color="blue"
                    compact
                    m="md"
                    form={form}
                  />
                }
              />
            </Input.Wrapper>
            <SideContent selected={selected} />
          </Stack>
        </>
      )}
    </Content>
  );
}

export function SideContent({ selected }) {
  const { addLink, removeLink, relatedApps } = useStory(selected);

  const { data: relatedStoryData } = relatedApps;

  const handleChange = (value) => {
    addLink.mutate({ storyId: selected, appId: value });
  };

  const handleRemove = (value) => {
    removeLink.mutate({ storyId: selected, appId: value });
  };

  return (
    <Input.Wrapper label="Linked applications">
      {/* {relatedStoryData && ( */}
      <AppMultiSelect
        selected={selected}
        relatedData={relatedStoryData}
        variant="default"
        addLink={handleChange}
        removeLink={handleRemove}
      />
      {/* )} */}
    </Input.Wrapper>
  );
}
