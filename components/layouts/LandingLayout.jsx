import Head from "next/head";
import { createStyles, AppShell } from "@mantine/core";
import React from "react";
import { LandingHeader } from "./components/LandingHeader";
const NAVBAR_WIDTH = 300;

const useStyles = createStyles((theme) => ({
  main: {
    flex: 1,
    paddingLeft: NAVBAR_WIDTH,
    backgroundColor: theme.colors.gray[0],
  },
  content: {
    minHeight: "100%",
  },
}));

export default function LandingLayout({ children }) {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Mantis</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AppShell header={<LandingHeader />}>{children}</AppShell>
    </>
  );
}
