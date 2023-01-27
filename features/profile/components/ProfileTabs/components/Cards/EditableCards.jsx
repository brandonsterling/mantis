import {
  UnstyledButton,
  ActionIcon,
  Card,
  Text,
  createStyles,
  Group,
  Button,
  Collapse,
  Flex,
} from "@mantine/core";
import { openContextModal } from "@mantine/modals";

import React, { useState } from "react";
import { useElementSize, useInputState, useHover } from "@mantine/hooks";
import { RTE } from "../../../../../../components/RTE";
import { MdOutlineClose } from "react-icons/md";
import { BiChevronDown, BiExpandAlt } from "react-icons/bi";
import AppModal from "../../../../../../components/AppModal";
import DeleteModal from "../../../../../modals/DeleteModal";
import { EditModal } from "../Modals/EditModal";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    "&:hover": {
      boxShadow: theme.shadows.md,
    },
  },
  textInput: {
    fontSize: "16px",
    padding: theme.spacing.sm,
    fontWeight: 500,
  },
  textHovered: {
    color: theme.colors.green[7],
  },

  textAreaInput: {
    border: "1px solid transparent",
  },
  content: {
    padding: 0,
  },
  root: {
    paddingLeft: theme.spacing.xs,

    border: "1px solid transparent",
  },
  footer: {
    paddingTop: theme.spacing.xs,
    marginTop: theme.spacing.md,
    // borderTop: `1px solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    // }`,
  },
}));

function EditableCards({ content, appId, toggle, compact }) {
  const { hovered, ref } = useHover();
  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState(false);

  const { classes, cx } = useStyles();

  const deleteStory = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    const res = await fetch(`/api/stories/${content.id}`, requestOptions).then(
      (result) =>
    );
  };

  const handleOpen = () => {
    if (!editing) {
      setOpened(!opened);
    }
  };

  if (!content) {
    return;
  }
  return (
    <Card p={3} withBorder className={classes.card}>
      <Card.Section
        onClick={() => handleOpen()}
        withBorder={opened}
        inheritPadding
        ref={ref}
      >
        <Flex align="flex-start">
          <Text
            style={{ flex: 1 }}
            className={classes.textInput}
            placeholder="Write your question here..."
            weight={500}
          >
            {content.title}
          </Text>
          <Group mr="md" sx={{ minWidth: 35 }} mt="sm">
            <ActionIcon variant="default" onClick={() => handleOpen()}>
              <BiChevronDown size={20} />
            </ActionIcon>
          </Group>
        </Flex>
      </Card.Section>
      <Collapse in={opened || editing || compact}>
        <Card.Section mt="md" inheritPadding>
          <RTE
            editable={true}
            content={content.content}
            classNames={{ content: classes.content, root: classes.root }}
          />
        </Card.Section>
        <Card.Section className={classes.footer}>
          <Group mb="xs" position="apart">
            <Group spacing="xs">
              <DeleteModal type="Story" deleteItem={deleteStory} />
            </Group>
            <Group spacing="xs" mr="xs">
              <Button
                variant="subtle"
                onClick={() => {
                  setEditing(false), setOpened(false);
                }}
                size="xs"
                compact
                color="dark"
              >
                Close
              </Button>
              <EditModal content={content} />
            </Group>
          </Group>
        </Card.Section>
      </Collapse>
    </Card>
  );
}

export default EditableCards;
