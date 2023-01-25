import React, { useState } from "react";
import {
  createStyles,
  Button,
  Menu,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";

const statuses = [
  {
    value: "Interviewing",
    label: "Interviewing",
    color: "teal",
  },
  { value: "On Hold", label: "On Hold", color: "yellow" },
  { value: "Waiting to apply", label: "Waiting to apply", color: "gray" },
];

const useStyles = createStyles((theme, { opened }) => ({
  control: {
    width: "70%",
    borderRadius: 6,
    transition: "background-color 150ms ease",
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  selectedItem: {
    backgroundColor: theme.colors.blue[0],
  },

  item: {
    backgroundColor: theme.colors.blue[0],
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

function StatusSelect({ item }) {
  const { hovered, ref } = useHover();
  if (hovered) {
  }

  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(
    statuses.find((status) => status.value === item.status)
  );
  const items = statuses.map((item) => (
    <Menu.Item
      className={selected == item && classes.selectedItem}
      onClick={(e) => handleSelected(e, item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpened(true);
  };

  const handleSelected = (e, item) => {
    e.stopPropagation();
    setSelected(item);
  };

  return (
    <Menu opened={opened} onChange={setOpened} radius="md">
      <Menu.Target onMouseEnter={(e) => e.stopPropagation()}>
        <Button
          size="xs"
          ref={ref}
          onClick={(e) => handleOpen(e)}
          className={classes.control}
          color={selected.color}
          variant="light"
        >
          {selected.label}
          {/* <Badge className={classes.badge} color={selected.color}> {selected.label}</Badge> */}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}

export default StatusSelect;
