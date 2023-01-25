import Head from "next/head";
import { createStyles, AppShell } from "@mantine/core";
import React from "react";
import { MainNav } from "../MainNav";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
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

export default function Protected({ children }) {
  const { classes } = useStyles();
  const router = useRouter();
  const user = useUser();

  return (
    <>
      <Head>
        <title>Mantis</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AppShell
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.white,
          },
        })}
        padding="0"
        navbar={<MainNav />}
      >
        {children}
      </AppShell>

      {/* <div>
        <main className={classes.main}>
          <div className={classes.content}>{children}</div>
        </main>
      </div> */}
    </>
  );
}
