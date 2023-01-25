import { Button, Group, Modal } from "@mantine/core";
import React, { useState } from "react";
import { StoryPage } from "../../../../../stories/StoryPage";

function StoryModal() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        overflow="inside"
        styles={(theme) => ({
          modal: {
            height: "800px",
            width: "90%",
            overflow: "hidden",
          },
          header: {
            marginBottom: "-18px",
          },
        })}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <StoryPage />
      </Modal>

      <Group position="center">
        <Button
          variant="outline"
          size="xs"
          compact
          color="dark"
          onClick={() => setOpened(true)}
        >
          Actions
        </Button>
      </Group>
    </>
  );
}

export default StoryModal;
