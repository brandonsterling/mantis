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
import { useNote } from "../../../../../../hooks/useNote";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

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
  const { classes, cx } = useStyles();
  const { hovered, ref } = useHover();
  const { update } = useNote();

  const local = dayjs.tz.guess();

  const deleteNote = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    // const res = await fetch(`/api/notes/${content.id}`, requestOptions).then(
    //   (result) =>
    // );
  };

  const updateNote = async (formContent) => {
    const updatedNote = {
      content: formContent,
    };
    update.mutate({ note: updatedNote, id: content.id });
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
            {dayjs().to(dayjs.utc(content.updatedAt).tz(local))}
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
