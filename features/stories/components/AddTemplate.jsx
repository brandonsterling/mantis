import { Button, Group, Menu } from "@mantine/core";
import React from "react";
import { templates } from "../../../constants/templates";

function AddTemplate({ editor }) {
  return (
    <Group position="right">
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button size="sm" variant="subtle" m="sm">
            + Add template
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => {
              editor.commands.setContent(templates["star"]);
            }}
          >
            STAR
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export default AddTemplate;
