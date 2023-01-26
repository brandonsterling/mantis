import Head from "next/head";
import { MantineProvider, createStyles } from "@mantine/core";
import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { SWRConfig } from "swr";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { rtlCache } from "../rtl-cache";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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

export default function App(props) {
  const { classes } = useStyles();
  const { Component, pageProps } = props;
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const Layout = Component.Layout || ((children) => <>{children}</>);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <QueryClientProvider client={queryClient}>
          <SWRConfig
            value={{
              fetcher: (url) => fetch(url).then((r) => r.json()),
            }}
          >
            <MantineProvider
              emotionCache={rtlCache}
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colors: {
                  brand: [
                    "#3ecf8e",
                    "#3ecf8e",
                    "#3ecf8e",
                    "#3ecf8e",
                    "#3ecf8e",
                    "#3ecf8e",
                    "#3ecf8e",
                    "#3ecf8e",
                    "#3ecf8e",
                    "#3ecf8e",
                  ],
                },
                primaryColor: "green",
              }}
              // theme={{
              //   /** Put your mantine theme override here */
              //   colorScheme: "light",
              // }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MantineProvider>
          </SWRConfig>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionContextProvider>
    </>
  );
}
