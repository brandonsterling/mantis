import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  Menu,
  Modal,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { HiOutlineTemplate } from "react-icons/hi";
import { RTE } from "./RTE";

const DETAIL_WIDTH = 260;
const useStyles = createStyles((theme) => ({
  root: {
    marginTop: 20,
    top: 0,
    height: "100vh",
    width: "100%",
  },
  tab: {
    overflow: "visible",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
    marginTop: 50,
  },
  content: {
    minHeight: "calc(100vh - 350px)",
    position: "relative",
    zIndex: 1,
    boxShadow: theme.colorScheme === "dark" ? "none" : theme.shadows.sm,
    paddingBottom: 80,
  },
  wrapper: {
    zIndex: 1,
    display: "flex",
    position: "relative",
    justifyContent: "space-between",
    paddingLeft: theme.spacing.xl * 2,
    paddingRight: theme.spacing.xl * 2,

    [`@media (max-width: 1080px)`]: {
      paddingLeft: theme.spacing.xl,
      paddingRight: theme.spacing.xl,
    },
  },
  panelWrapper: {
    boxSizing: "border-box",
    paddingRight: theme.spacing.md,
    position: "sticky",
    top: theme.spacing.xl,
    left: 0,
    flex: `0 0 ${DETAIL_WIDTH - 20}px`,
    [`@media (max-width: 1080px)`]: {
      display: "none",
    },
  },

  panelInner: {
    paddingTop: 0,
    paddingBottom: theme.spacing.xl,
    paddingLeft: theme.spacing.md,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  container: {
    marginTop: theme.spacing.xl,
    width: `calc(100% - ${DETAIL_WIDTH}px)`,
    maxWidth: "820px",
    marginLeft: "auto",
    marginRight: "auto",

    [`@media (max-width: 1080px)`]: {
      width: "100%",
      paddingRight: 0,
    },
  },
  wrap: {
    flex: `0 0 ${DETAIL_WIDTH - 20}px`,

    [`@media (max-width: 1080px)`]: {
      display: "none",
    },
  },
}));

function Template({ setContent }) {
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <ActionIcon>
          <HiOutlineTemplate color="gray" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => setContent(`<h1>Situation</>`)}>
          STAR
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
function AppModal() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [a_content, setContent] = useState(
    "This time i really made all of these cool awesome improvements"
  );

  return (
    <>
      <Modal
        title={<Title order={4}>Edit question</Title>}
        overlay
        overlayColor="lightgray"
        onClose={() => setOpened(false)}
        size="lg"
        opened={opened}
      >
        <Stack>
          <TextInput
            value="Salesfoce performance improvements"
            placeholder="Your question"
          />
          <RTE content={a_content} />
          <Group position="apart">
            <Template setContent={setContent} />
            <div>
              <Button
                variant="subtle"
                size="xs"
                compact
                color="dark"
                mr="sm"
                onClick={() => setOpened(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                size="xs"
                compact
                color="dark"
                onClick={() => setOpened(false)}
              >
                Save
              </Button>
            </div>
          </Group>
        </Stack>
      </Modal>

      <Button
        variant="outline"
        size="xs"
        compact
        color="dark"
        onClick={() => setOpened(true)}
      >
        Edit
      </Button>
    </>
  );
}

export default AppModal;
