import { forwardRef, useState } from "react";
import {
  MultiSelect,
  Text,
  Box,
  CloseButton,
  Badge,
  createStyles,
  ActionIcon,
} from "@mantine/core";
import { BsChevronBarDown, BsPlus } from "react-icons/bs";
import { useEffect } from "react";
import { useApplications } from "../hooks/useApplications";
import { transformApps } from "../utils/transform";

const useStyles = createStyles((theme) => ({
  input: {
    backgroundColor: theme.white,
  },

  root: {},
}));

function Value({
  value,
  label,
  onRemove,
  handleRemove,
  classNames,
  ...others
}) {
  return (
    <div style={{ margin: "calc(10px / 2 - 2px) calc(10px / 2)" }} {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          // backgroundColor:
          //   theme.colorScheme === "dark"
          //     ? theme.colors.dark[7]
          //     : theme.colors.gray[2],
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <Box sx={{ lineHeight: 1.5, fontSize: 12 }}>{label}</Box>
        <CloseButton
          onMouseDown={(e) => handleRemove(value)}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

export default function AppMultiSelect({
  selected,
  relatedData,
  addLink,
  removeLink,
  ...props
}) {
  const { classes } = useStyles();

  const { applications } = useApplications({ select: transformApps });

  const relatedApps = relatedData?.map((app) => app.application_id) || [];

  // if (!applications.data) return <div>hi</div>;

  const Item = forwardRef(({ label, value, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Box
          onMouseDown={() => addLink(value)}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <div>{label}</div>
        </Box>
      </div>
    );
  });
  return (
    <MultiSelect
      classNames={classes}
      className={classes.root}
      data={applications?.data ? applications.data : []}
      value={relatedApps}
      valueComponent={({ value, label, onRemove }) => (
        <Value
          value={value}
          label={label}
          onRemove={onRemove}
          handleRemove={removeLink}
        />
      )}
      itemComponent={Item}
      searchable
      rightSectionWidth={0}
      nothingFound="Nothing found"
      {...props}
    />
  );
}
