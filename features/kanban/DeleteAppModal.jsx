import {
  Stack,
  createStyles,
  Spoiler,
  Title,
  TextInput,
  SimpleGrid,
  Button,
  Textarea,
  Highlight,
  Text,
  Modal,
  ActionIcon,
  Input,
  Group,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useForm } from "@mantine/form";
import CompanySearch from "../../components/CompanySearch";
import { useApplication } from "../../hooks/useApplication";
import { RTE } from "../../components/RTE";
import { IoTrashOutline } from "react-icons/io5";
import Job from "./components/Job";
const useStyles = createStyles((theme) => ({
  root: {
    // border: "1px solid transparent",
  },
  content: {
    // padding: 0,
    fontSize: theme.fontSizes.sm,
  },
}));

function DeleteAppModal({ job, hovered }) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const { deleteApp } = useApplication();

  const handleDelete = () => {
    deleteApp.mutate(job.id);
    setOpened(false);
  };

  return (
    <>
      <Modal size="auto" opened={opened} onClose={() => setOpened(false)}>
        <Stack>
          <Text>Are you sure you'd like to delete this app?</Text>
          <Job readOnly={true} job={job} />
          <Group position="center" mt="lg">
            <Button
              color="dark"
              variant="outline"
              onClick={() => setOpened(false)}
            >
              Cancel
            </Button>
            <Button color="red" onClick={() => handleDelete()}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
      <ActionIcon onClick={(e) => (e.stopPropagation(), setOpened(true))}>
        {hovered && <IoTrashOutline />}
      </ActionIcon>
    </>
  );
}

export default DeleteAppModal;
