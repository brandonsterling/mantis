import {
  Accordion,
  Badge,
  createStyles,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React from "react";
import { QUESTION_STATES } from "../../../constants/questions";
import RTEPanel from "./AccordionItem";
import FavoriteButton from "./FavoriteButton";

const useStyles = createStyles((theme) => ({
  item: {
    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },
    border: "1px solid #ededed",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  panel: {
    // backgroundColor: theme.colors.blue[0],
    // borderColor: theme.colors.blue[5],
    // borderRadius: theme.radius.sm,
    // margin: theme.spacing.xs,
  },
  control: {
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },
  },
  label: {
    fontFamily: "Greycliff CF, sans-serif",
    fontWeight: "550",
    fontSize: theme.fontSizes.md,
  },
}));

function QuestionAccordion({ data, appId }) {
  const { classes } = useStyles();

  const accordionItems = data.questions.map((question, index) => {
    return (
      <Accordion.Item key={question.id} value={question.id}>
        <Accordion.Control>
          <Group position="apart" noWrap>
            <div>
              <Text> {question.question}</Text>
            </div>
            <Badge
              style={{ minWidth: 80 }}
              size="sm"
              // variant="outline"
              color={QUESTION_STATES[question.type] == "Ask" ? "green" : "blue"}
            >
              {QUESTION_STATES[question.type]}
            </Badge>
          </Group>
        </Accordion.Control>
        <RTEPanel content={question.answer} />
      </Accordion.Item>
    );
  });
  return (
    <Accordion
      classNames={classes}
      className={classes.root}
      multiple={true}
      variant="separated"
    >
      {accordionItems}
    </Accordion>
  );
}

function isFavorite(relatedQuestions, id) {
  return relatedQuestions.find((question) => question.question_id == id)
    ?.favorite;
}

export default QuestionAccordion;
