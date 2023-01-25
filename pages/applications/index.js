import {
  Title,
  Flex,
  Box,
  createStyles,
  Group,
  ThemeIcon,
} from "@mantine/core";
import React from "react";
import { BsQuestionSquare } from "react-icons/bs";
import Protected from "../../components/layouts/Protected";
import KanbanBoard from "../../features/kanban/KanbanBoard";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingRight: "50px",
    paddingLeft: "20px",
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
    height: 60,
    padding: "0px 18px",

    marginTop: theme.spacing.md,
  },
}));

function Page() {
  // const { data, error } = useSWR("/api/applications");
  const { classes } = useStyles();

  return (
    <>
      {/* <header style={{ position: "relative" }}>
        <Flex
          gap="xl"
          justify="flex-start"
          align="center"
          className={classes.header}
        >
          <Text size="sm" weight={500} pl={30}>
            Applications
          </Text>
          <TextInput
            style={{ maxWidth: "300px", paddingLeft: "30px" }}
            placeholder="Search applications"
            icon={<BsSearch size={18} stroke={1.5} />}
            radius="xl"
            size="xs"
          ></TextInput>
        </Flex>
      </header> */}
      <Flex className={classes.header}>
        <Group>
          {/* <ThemeIcon size="xl" color="orange" variant="light">
            <BsQuestionSquare size={25} />
          </ThemeIcon> */}
          <Title order={2}>Applications</Title>
        </Group>
      </Flex>
      <div className={classes.wrapper}>
        <KanbanBoard />
      </div>
    </>
  );
}

Page.Layout = Protected;

export default Page;
