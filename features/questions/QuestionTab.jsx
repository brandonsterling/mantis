import {
  Stack,
  Text,
  createStyles,
  Group,
  Button,
  Textarea,
  Modal,
  Tabs,
  Accordion,
  ActionIcon,
} from "@mantine/core";
import React, { useState } from "react";
import TabPanelHeader from "../profile/components/ProfileTabs/components/Tabs/TabPanelHeader";
import NewQuestionModal from "./components/NewQuestionModal";
import { BiEdit } from "react-icons/bi";

import QuestionAccordion from "./QuestionAccordion/QuestionAccordion";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  item: {
    "&[data-active]": {
      backgroundColor: "transparent",
    },
  },
  control: {
    "&[data-active]": {
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

function QuestionTab({ data, appId }) {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Tabs.Panel value="questions" pt="xs">
      <TabPanelHeader
        name="Questions"
        description="Have a few questions prepared and ready to go for your next interview"
        action={
          <>
            {/* <ExistingQuestionModal data={data} appId={appId} /> */}

            <NewQuestionModal appId={appId} />
          </>
        }
      />
      {data && data?.questions.length > 0 ? (
        <QuestionAccordion appId={appId} data={data} />
      ) : (
        <Text>Create a question to get started!</Text>
      )}
    </Tabs.Panel>
  );
}

export default QuestionTab;
