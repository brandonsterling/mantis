import { Button, Flex, Group, Text, Title } from "@mantine/core";
import React from "react";
import { BsPlusLg } from "react-icons/bs";

function TabPanelHeader({ name, description, action, children }) {
  return (
    <>
      <Flex direction="row" my="md" align="flex-start">
        <div style={{ flex: 1 }}>
          <Title order={5}>{name}</Title>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </div>
        <Group>
          {children}
          {action}
        </Group>
      </Flex>
    </>
  );
}

export default TabPanelHeader;
