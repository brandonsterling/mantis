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
import { useForm } from "@mantine/form";
import { Content } from "../../components/FormCard/Content";
import { Side } from "../../components/FormCard/Side";
import { useQuestion } from "../../hooks/useQuestion";
import { useRelatedQuestion } from "../../hooks/useRelatedQuestion";
import AppMultiSelect from "../../components/AppMultiSelect";
import AddTemplate from "../stories/components/AddTemplate";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  rteRoot: {
    border: `1px solid transparent`,

    "&:hover": {
      border: `1px solid ${theme.colors.blue[6]}`,
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

  question: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  questionInput: {
    paddingLeft: theme.spacing.sm,
    fontWeight: 700,
    fontSize: 26,
    lineHeight: 1.35,
    border: "1px solid transparent",

    "&:hover": {
      border: `1px solid ${theme.colors.blue[6]}`,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

function Main({ selected }) {
  const { classes } = useStyles();
  const { question, update } = useQuestion(selected);
  const { data } = question;

  if (question.isLoading && question.isFetching) {
    return <div>loading..</div>;
  }

  const form = useForm({
    initialValues: {
      question: data.question,
      answer: data.answer,
    },
  });

  const [debounced] = useDebouncedValue(form.values, 1000);

  useEffect(() => {
    if (form.isDirty()) {
      let updatedQuestion = {
        answer: form.values.answer,
        question: form.values.question,
      };
      update.mutate({
        id: data.id,
        questionData: updatedQuestion,
      });

      form.resetDirty();
    }
  }, [debounced]);

  useEffect(() => {
    if (data.question !== form.values.question) {
      form.setValues({
        question: data.question,
        answer: data.answer,
      });
    }
  }, [selected]);

  return (
    <Content>
      {data && (
        <>
          <Textarea
            my={10}
            autosize
            classNames={{
              input: classes.questionInput,
              root: classes.questionRoot,
            }}
            {...form.getInputProps("question")}
          />
          <RTE
            classNames={{ root: classes.rteRoot }}
            selected={selected}
            form={form}
            content={data.answer}
            fieldName="answer"
          />
        </>
      )}
    </Content>
  );
}

function SideContent({ selected }) {
  const { addLink, removeLink, relatedApps } = useRelatedQuestion(selected);

  const { data } = relatedApps;

  const handleChange = (value) => {
    addLink.mutate({ question_id: selected, appId: value });
  };

  const handleRemove = (value) => {
    console.log("removing");
    removeLink.mutate({ question_id: selected, appId: value });
  };

  return (
    <Side>
      {data && (
        <AppMultiSelect
          styles={(theme) => ({
            input: {
              backgroundColor: "transparent",
              borderColor: "lightgray",
            },
          })}
          label="Linked applications"
          selected={selected}
          relatedData={data}
          addLink={handleChange}
          removeLink={handleRemove}
        />
      )}
    </Side>
  );
}

export function CardContent({ selected }) {
  return (
    <>
      <Main selected={selected} />
      <SideContent selected={selected} />
    </>
  );
}
