import {
  createStyles,
  Text,
  Container,
  Card,
  Select,
  Title,
  Paper,
  SimpleGrid,
  Grid,
  Anchor,
  Group,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import useSWR from "swr";
import FocusLayout from "../../components/layouts/FocusLayout";
import Protected from "../../components/layouts/Protected";
import ApplicationList from "../../features/interview-mode/ApplicationList";
import { InterviewCard } from "../../features/interview-mode/InterviewCard";
import MainSection from "../../features/interview-mode/MainSection";
import Section from "../../features/interview-mode/Section";
import TableOfContents from "../../features/interview-mode/TableOfContents";
import { useApplication } from "../../hooks/useApplication";
import { useApplications } from "../../hooks/useApplications";
import { transformApps } from "../../utils/transform";

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing.xl,
  },
  sideWrapper: {
    boxSizing: "border-box",
    paddingLeft: theme.spacing.md,
    position: "sticky",
    top: theme.spacing.xl,
    right: 0,
    paddingTop: 10,
  },
  container: {
    marginTop: theme.spacing.xl * 3,
  },
  grid: {
    height: "100%",
  },
  colWrapper: {
    borderRadius: 10,
    height: "100%",
  },
  colTitle: {
    color: theme.colors.gray[7],
  },
  title: {
    padding: 10,
  },
  header: {
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
    backgroundColor: theme.white,
    height: 60,
  },

  cols: {
    height: "100%",
    backgroundColor: theme.colors.gray[0],

    display: "flex",
  },
  leftCol: {
    flexBasis: "20%",
  },
  centerCol: {
    flexBasis: "80%",
  },
  rightCol: {
    flexBasis: "20%",
  },
}));

function Page() {
  const { classes } = useStyles();
  const router = useRouter();

  const { id } = router.query;

  const { applications } = useApplications({ select: transformApps });

  const [active, setActive] = useState();

  const { application } = useApplication(active ? active : null);

  const { data } = application;

  useEffect(() => {
    if (router.isReady && id) {
      setActive(id[0]);
    } else {
      setActive(null);
    }
  }, [router]);

  // if (applications.isLoading) {
  //   return <div>loading..</div>;
  // }

  // if (application.isLoading && applications?.data) {
  //
  //   return (
  //     <Card>
  //       <Select
  //         withinPortal
  //         onChange={setActive}
  //         value={active}
  //         data={applications.data}
  //       />
  //     </Card>
  //   );
  // }

  return (
    <div className={classes.cols}>
      <div className={classes.leftCol}>
        <div className={classes.sideWrapper}>
          {application?.data && (
            <UnstyledButton onClick={() => router.push("/interview-mode")}>
              <Group>
                <BsChevronLeft size={10} />
                <Anchor size="sm" weight={500} color="dimmed">
                  Back to applications
                </Anchor>
              </Group>
            </UnstyledButton>
          )}
        </div>
      </div>
      <div className={classes.centerCol}>
        <div className={classes.wrapper}>
          <Container className={classes.container}>
            <Card withBorder px="xl" sx={{ height: "100%" }}>
              <Title mb="sm" order={2}>
                Applications
              </Title>
              {!application?.data ? (
                <ApplicationList
                  setActive={setActive}
                  applications={applications}
                />
              ) : (
                <MainSection data={data} />
              )}
            </Card>
          </Container>
        </div>
      </div>
      <div className={classes.rightCol}>
        {application?.data && <TableOfContents />}

        {/* {applications?.data && (
          <Select
            onChange={setActive}
            value={active}
            data={applications.data}
          />
        )} */}
      </div>
    </div>
  );
}

Page.Layout = FocusLayout;

export default Page;
