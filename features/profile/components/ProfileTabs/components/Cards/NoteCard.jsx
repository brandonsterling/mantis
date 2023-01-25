import {
  UnstyledButton,
  ActionIcon,
  Card,
  Title,
  Text,
  Box,
  createStyles,
  Group,
  Button,
  Collapse,
  Space,
  Flex,
} from "@mantine/core";
import { openContextModal } from "@mantine/modals";

import React, { useState } from "react";
import { useElementSize, useInputState, useHover } from "@mantine/hooks";
import { RTE } from "../../../../../../components/RTE";
import { BiChevronDown, BiExpandAlt } from "react-icons/bi";
import DeleteModal from "../../../../../modals/DeleteModal";
import { EditModal } from "../Modals/EditModal";
import { AddNoteModal } from "../Modals/AddNoteModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    "&:hover": {
      borderColor: theme.colors.gray[5],
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
    paddingLeft: 0,
  },
  root: {
    paddingLeft: theme.spacing.xs,

    border: "1px solid transparent",
  },
  footer: {
    // borderTop: `1px solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    // }`,
  },
}));

function NoteCard({ content, appId }) {
  const lastUpdated = dayjs().from(dayjs(content.updatedAt), true);
  const { classes, cx } = useStyles();
  const { hovered, ref } = useHover();

  const deleteNote = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    const res = await fetch(`/api/notes/${content.id}`, requestOptions).then(
      (result) => console.log(result)
    );
  };

  const updateNote = async (formContent) => {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({
        content: formContent,
        id: content ? content.id : undefined,
      }),
    };
    const res = await fetch(`/api/notes/${content.id}`, requestOptions).then(
      (result) => console.log(result)
    );
  };

  if (!content) {
    return;
  }
  return (
    <Card ref={ref} p={3} withBorder className={classes.card}>
      <Card.Section mt="md" inheritPadding>
        <Text px="sm" pt="md">
          {content.content}
        </Text>
        {/* <RTE
          editable={true}
          content={content.content}
          classNames={{ content: classes.content, root: classes.root }}
        /> */}
      </Card.Section>
      <Card.Section px="md" py="xs" className={classes.footer}>
        <Group pt="md" position="apart">
          <Text py="xs" size="xs" color="dimmed">
            Last updated {lastUpdated} ago
          </Text>
          <Group>
            <DeleteModal
              hovered={hovered}
              type="Note"
              deleteItem={deleteNote}
            />
            <AddNoteModal
              hovered={hovered}
              onSubmit={updateNote}
              action="Edit"
              note={content}
              appId={appId}
            />
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default NoteCard;
