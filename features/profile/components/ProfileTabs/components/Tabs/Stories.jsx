import {
  Stack,
  createStyles,
  Button,
  Divider,
  Textarea,
  Group,
  Modal,
  Tabs,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import TabPanelHeader from "./TabPanelHeader";
import EditableCards from "../Cards/EditableCards";
import { useForm } from "@mantine/form";
import { StoryPage } from "../../../../../../pages/stories/[[...id]]";
import StoryModal from "../Modals/StoryModal";

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

function StoryCards({ stories, toggle, appId }) {
  const cards = stories.map((story) => (
    <EditableCards content={story} appId={appId} toggle={toggle} />
  ));
  return <Stack>{cards}</Stack>;
}

function Stories({ stories, toggle, appId }) {
  const { classes } = useStyles();

  return (
    <Tabs.Panel value="stories" pt="xs">
      <TabPanelHeader
        name="Stories"
        description="Have a few stories prepared and ready to go for your next interview"
        action={<StoryModal />}
      ></TabPanelHeader>

      {stories ? (
        <StoryCards stories={stories} toggle={toggle} appId={appId} />
      ) : (
        <Text>Create a story to get started!</Text>
      )}
    </Tabs.Panel>
  );
}

export default Stories;
