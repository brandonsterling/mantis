import { Button, createStyles, Menu, Select } from "@mantine/core";
import { useRouter } from "next/router";
import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import { BsCircle, BsCircleHalf } from "react-icons/bs";
import { APP_STATES_ICON } from "../../../constants/appStates";
import { useApplication } from "../../../hooks/useApplication";

const useStyles = createStyles((theme) => ({
  itemWrapper: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  target: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
}));

function Status({ status, app }) {
  const { classes } = useStyles();

  return (
    <Button
      onClick={() => handleClick()}
      className={classes.itemWrapper}
      compact
      variant="outline"
      color="dark"
      leftIcon={APP_STATES_ICON[status].icon}
    >
      {status}
    </Button>
  );
}

const StatusTarget = forwardRef(({ status, ...others }, ref) => {
  const { classes } = useStyles();
  return (
    <Button
      ref={ref}
      compact
      variant="outline"
      color="dark"
      leftIcon={APP_STATES_ICON[status].icon}
      {...others}
    >
      {status}
    </Button>
  );
});

function JobStatus({ status, app }) {
  const { classes } = useStyles();
  const router = useRouter();
  const { update } = useApplication();
  const [appStatus, setStatus] = useState(app.status);

  const handleClick = (value) => {
    const newApp = {
      status: value,
    };
    update.mutate({ appId: app.id, app: newApp });

    setStatus(value);
  };

  const statusItems = Object.keys(APP_STATES_ICON).map((status) => {
    return (
      <Menu.Item size={14}>
        <Status status={status} app={app} />
      </Menu.Item>
    );
  });

  return (
    <Select
      withinPortal
      onChange={(value) => handleClick(value)}
      placeholder="Status"
      value={appStatus}
      data={Object.keys(APP_STATES_ICON)}
    ></Select>
    // <Menu onC withinPortal shadow="xl" position="bottom-start">
    //   <Menu.Target>
    //     <StatusTarget className={classes.target} status={app.status} />
    //   </Menu.Target>
    //   <Menu.Dropdown>{statusItems}</Menu.Dropdown>
    // </Menu>
  );
}

export default JobStatus;
