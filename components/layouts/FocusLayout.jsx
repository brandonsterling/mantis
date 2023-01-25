import Head from "next/head";
import { createStyles, AppShell } from "@mantine/core";
import React from "react";
import { HeaderResponsive } from "./components/Header";
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

export default function FocusLayout({ children }) {
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
      <AppShell padding="0">{children}</AppShell>
    </>
  );
}
