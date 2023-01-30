import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, Container, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LandingLayout from "../components/layouts/LandingLayout";

function SignIn() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/applications");
    }
  }, [session]);

  const redirectBaseLink =
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://mantis-one.vercel.app";

  return (
    <Box>
      <Paper
        ml="auto"
        mr="auto"
        sx={{ maxWidth: 500, marginTop: 100 }}
        radius="md"
        p="xl"
        withBorder
      >
        <Auth
          redirectTo={`${redirectBaseLink}/sign-in`}
          magicLink
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "black",
                  brandAccent: "black",
                },
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
}

SignIn.Layout = LandingLayout;

export default SignIn;
