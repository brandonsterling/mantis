import Head from "next/head";
import { createStyles } from "@mantine/core";
import React from "react";
import { HeaderResponsive } from "./components/Header";
const NAVBAR_WIDTH = 300;

const useStyles = createStyles((theme) => ({
  main: {
    paddingTop: theme.spacing.xs,
    flex: 1,
    height: "100vh",
    width: "100%",
    overflow: "auto",
    backgroundColor: theme.colors.gray[0],
  },
}));

export default function HLayout({ children }) {
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
      <HeaderResponsive />
      <main className={classes.main}>{children}</main>
    </>
  );
}
