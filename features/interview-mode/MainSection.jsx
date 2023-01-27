import {
  Card,
  Container,
  createStyles,
  Divider,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { InterviewCard } from "./InterviewCard";
import Section from "./Section";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingBottom: "500px",
  },
  container: {
    paddingBottom: "55px",
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  colWrapper: {
    borderRadius: 10,
    height: "100%",
  },
  colTitle: {
    color: theme.colors.gray[7],
  },
  title: {
    padding: 10,
  },
  header: {
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
    backgroundColor: theme.white,
    height: 60,
  },

  cols: {
    paddingTop: theme.spacing.xl,

    backgroundColor: theme.colors.gray[0],

    display: "flex",
  },
  leftCol: {
    flexBasis: "20%",
  },
  centerCol: {
    flexBasis: "80%",
  },
  rightCol: {
    flexBasis: "20%",
  },
}));

function MainSection({ data }) {
  const { classes } = useStyles();
  return (
    <>
      <Card.Section inheritPadding p="xl">
        <Title>{data.company}</Title>
        <Text> {data.role}</Text>
      </Card.Section>
      <Divider />

      <Section section="Questions">
        {data.questions.map((question, index) => {
          return (
            <InterviewCard
              index={index}
              title={question.question}
              content={question.answer}
            />
          );
        })}
      </Section>
      <Section section="Stories">
        {data.stories.map((story, index) => {
          return (
            <InterviewCard
              index={index}
              title={story.title}
              content={story.content}
            />
          );
        })}
      </Section>
      <Section section="Notes">
        {data.notes.map((note, index) => {
          return <InterviewCard index={index} content={note.content} />;
        })}
      </Section>
    </>
  );
}

export default MainSection;
