import { Tabs } from "@mantine/core";
import React from "react";

function StyledTabs(props) {
  return (
    <Tabs
      unstyled
      styles={(theme) => ({
        tab: {
          ...theme.fn.focusStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[5]
          }`,
          padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          cursor: "pointer",
          fontSize: theme.fontSizes.sm,
          display: "flex",
          alignItems: "center",

          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },

          "&:not(:first-of-type)": {
            borderLeft: 0,
          },

          "&:first-of-type": {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          "&:last-of-type": {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },

          "&[data-active]": {
            backgroundColor: theme.colors.gray[1],
            color: theme.black,
          },
        },

        tabIcon: {
          marginRight: theme.spacing.xs,
          display: "flex",
          alignItems: "center",
        },

        tabLabel: {
          fontWeight: 500,
        },
      })}
      {...props}
    />
  );
}

export default StyledTabs;
