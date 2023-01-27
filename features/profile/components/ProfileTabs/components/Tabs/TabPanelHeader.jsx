import { Button, Flex, Group, Text, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { BsPlusLg, BsQuestionSquare } from "react-icons/bs";

function TabPanelHeader({ name, description, action, children }) {
  return (
    <>
      <Flex direction="row" my="md" align="flex-start">
        <div style={{ flex: 1 }}>
          <Group>
            {/* <ThemeIcon size="lg" color="indigo">
              <BsQuestionSquare size="20" />
            </ThemeIcon> */}

            <div>
              <Title order={5}>{name}</Title>
              <Text size="sm" c="dimmed">
                {description}
              </Text>
            </div>
          </Group>
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
