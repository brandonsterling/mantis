import {
  createStyles,
  Text,
  Checkbox,
  Button,
  Group,
  ActionIcon,
  Spoiler,
  Avatar,
  Image,
  Flex,
  Divider,
  Card,
  Skeleton,
} from "@mantine/core";
import React from "react";
import { useHover, useInputState } from "@mantine/hooks";
import { HiPencil } from "react-icons/hi";
import { useRouter } from "next/router";
import JobStatus from "./JobStatus";

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: 50,
    height: "100%",
  },
  title: {
    marginBottom: 20,
    marginTop: 50,
  },
  input: {
    fontSize: "50px",
    fontWeight: 500,
  },

  image: {
    objectFit: "contain",
  },
  content: {
    padding: 0,
    color: theme.colors.gray[8],
    fontSize: "14px",
  },
  root: {
    border: "1px solid transparent",
  },
}));

function EditButton({ setChecked, checked, hovered }) {
  if (hovered) {
    return (
      <ActionIcon onClick={() => setChecked(!checked)}>
        <HiPencil />
      </ActionIcon>
    );
  }
}

function Details({ application }) {
  const { classes } = useStyles();
  const router = useRouter();
  const { id } = router.query;

  return (
    <Card sx={{ marginBottom: 10 }} withBorder>
      {!application ? (
        <>
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={20} radius="xl" />
          <Skeleton height={20} mt={6} radius="xl" />
          <Skeleton height={20} mt={6} width="70%" radius="xl" />
        </>
      ) : (
        <Flex gap="xs">
          <div>
            <Image
              sx={{ marginBottom: 10 }}
              width={60}
              fit="contain"
              src={application.logo}
            />
            <Text sx={{ fontSize: "25px", fontWeight: 500 }}>
              {application.role}
            </Text>
            <Text
              mb="sm"
              sx={{
                fontSize: "20px",
                fontWeight: 400,
              }}
            >
              {application.company}
            </Text>
            <JobStatus status={application.status} app={application} />
          </div>
        </Flex>
      )}
    </Card>
  );
}

export default Details;
