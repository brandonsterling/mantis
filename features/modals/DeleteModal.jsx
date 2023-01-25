import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

function DeleteModal({ deleteItem, type, hovered }) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Delete ${type}`}
      >
        <Text>Are you sure you'd like to delete this {type}?</Text>
        <Group position="right">
          <Button
            position="right"
            compact
            color="red"
            onClick={() => deleteItem()}
          >
            Delete
          </Button>
        </Group>
      </Modal>
      {hovered && (
        <ActionIcon onClick={setOpened}>
          <HiOutlineTrash color="gray" />
        </ActionIcon>
      )}
    </>
  );
}

export default DeleteModal;
