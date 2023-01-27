"use client";
import { Center, Container, createStyles, Loader } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Tasks } from "../../features/jobProfile";
import Protected from "../../components/layouts/Protected";
import JobTabs from "../../features/profile/components/ProfileTabs/ProfileTabs";
import { useApplication } from "../../hooks/useApplication";
import Details from "../../features/profile/components/Details";

const DETAIL_WIDTH = 260;
const useStyles = createStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.colors.gray[0],
  },
  tab: {
    overflow: "hidden auto",
    paddingTop: theme.spacing.xl,

    // minHeight: "920px",
    height: "100vh",
  },

  container: {
    marginTop: theme.spacing.xl,
    width: `calc(100% - ${DETAIL_WIDTH}px)`,
    maxWidth: "820px",
    marginLeft: "auto",
    marginRight: "auto",

    [`@media (max-width: 1080px)`]: {
      width: "100%",
      paddingRight: 0,
    },
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    boxSizing: "border-box",
  },
  sideCol: {
    flexBasis: "15%",
    maxWidth: "15%",
  },
  centerCol: {
    flexBasis: "85%",
    maxWidth: "85%",
  },
  leftContainer: {
    paddingRight: "24px",
  },
  rightContainer: {
    position: "sticky",
    top: 10,
    paddingLeft: "24px",
  },
  main: {
    height: "100%",
    paddingTop: theme.spacing.xl,
    backgroundColor: theme.colors.gray[0],
  },
}));

function Page() {
  const { classes } = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [opened, setOpened] = useState();

  const { application } = useApplication(id);

  if (application.isLoading) {
    return <div></div>;
  }

  // if (application.isLoading) {
  //   return (
  //     <>
  //       <div
  //         style={{
  //           position: "absolute" /* or absolute */,
  //           top: "50%",
  //           left: "50%",
  //         }}
  //       >
  //         <Loader color="green" variant="dots" />
  //       </div>
  //     </>
  //   );
  // }
  return (
    <div className={classes.main}>
      {/* <Container sx={{ paddingTop: 35 }} size="xl"> */}
      <div className={classes.grid}>
        <div className={classes.sideCol}>
          <div className={classes.rightContainer}>
            {/* <Tasks data={application.data} /> */}
          </div>
        </div>
        <div className={classes.centerCol}>
          <Details application={application.data} />
          <JobTabs appId={id} data={application.data} />
        </div>

        <div className={classes.sideCol}>
          <div className={classes.rightContainer}>
            {/* <Tasks data={application.data} /> */}
          </div>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
}

Page.Layout = Protected;

export default Page;
