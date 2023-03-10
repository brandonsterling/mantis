import {
  Card,
  Text,
  createStyles,
  Group,
  Avatar,
  UnstyledButton,
  ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoChevronForward, IoTrashOutline } from "react-icons/io5";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useHover } from "@mantine/hooks";
import { useApplication } from "../../../hooks/useApplication";
import DeleteAppModal from "../DeleteAppModal";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

const useStyles = createStyles((theme) => ({
  card: {
    maxHeight: "200px",
    maxWidth: "300px",
  },
  image: {
    objectFit: "contain",
  },
  item: {
    cursor: "pointer",
    transition: "transform 150ms ease, box-shadow 150ms ease",
    maxHeight: "200px",
    maxWidth: "300px",

    "&:hover": {
      // boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    marginTop: theme.spacing.xs,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

function Job({ job, setActive, readOnly }) {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();

  const { deleteApp } = useApplication();

  const router = useRouter();
  if (!job) {
    return;
  }

  const local = dayjs.tz.guess();

  const handleClick = () => {
    if (!readOnly) {
      if (router.asPath.includes("interview-mode")) {
        router.push(`/interview-mode/${job.id}`);
      } else {
        router.push(`/applications/${job.id}`);
      }
    }
  };

  return (
    <Card
      ref={ref}
      my={5}
      onClick={() => handleClick()}
      className={classes.item}
      withBorder
    >
      <Group noWrap>
        <Avatar classNames={{ image: classes.image }} src={job.logo} />
        <div>
          <Text size="sm" weight={500}>
            {job.role}
          </Text>
          <Text size="sm" c="dimmed">
            {job.company}
          </Text>
        </div>
      </Group>
      {!readOnly && (
        <Card.Section className={classes.footer}>
          <Group position="apart">
            <DeleteAppModal hovered={hovered} job={job} />
            <Text size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
              {dayjs().to(dayjs.utc(job.updatedAt).tz(local))}
            </Text>
          </Group>
        </Card.Section>
      )}
    </Card>
  );
}

export default Job;
