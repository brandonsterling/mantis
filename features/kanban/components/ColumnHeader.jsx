import {
  Stack,
  Flex,
  Title,
  createStyles,
  Box,
  Group,
  Badge,
  Divider,
  ActionIcon,
  ThemeIcon,
} from "@mantine/core";
import React from "react";
import { BsCircle, BsCircleHalf, BsDot } from "react-icons/bs";
import { openContextModal } from "@mantine/modals";
import AddAppModal from "../AddAppModal";

const statusIcons = [
  {
    status: "Bookmarked",
    icon: BsDot,
    color: "blue",
  },
  {
    status: "Applied",
    icon: BsCircleHalf,
    color: "yellow",
  },
  {
    status: "Interviewing",
    icon: BsCircleHalf,
    color: "yellow",
  },
  {
    status: "Offered",
    icon: BsCircleHalf,
    color: "yellow",
  },
  {
    status: "Rejected",
    icon: BsCircleHalf,
    color: "yellow",
  },
];

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100%",
    borderRadius: 10,
    marginTop: 5,
  },
  title: {
    color: theme.colors.gray[8],
  },
}));

function ColumnHeader({ name, jobCount, getLastPosition, apps }) {
  const { classes, cx } = useStyles();
  const ColumnIcon = statusIcons.find((item) => item.status == name)
    ? statusIcons.find((item) => item.status == name)
    : {
        status: "Waiting to Apply",
        icon: BsCircle,
        color: "gray",
      };
  return (
    <>
      <Box className={classes.card} my="sm">
        <Group position="apart">
          <Group>
            {/* <ThemeIcon variant="light" color={ColumnIcon.color}> 
            <ColumnIcon.icon size="20" color={ColumnIcon.color} />
            </ThemeIcon> */}
            <Title className={classes.title} order={6}>
              {name}
            </Title>
            <Badge color="gray" size="md">
              {jobCount}
            </Badge>
          </Group>
          <AddAppModal />
        </Group>
      </Box>
      <Divider />
    </>
  );
}

export default ColumnHeader;
