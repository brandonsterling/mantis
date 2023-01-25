import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, Container, Paper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LandingLayout from "../components/layouts/LandingLayout";

function NotFound() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/applications");
    }
  }, [session]);

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
        <Text size="xl" weight={500}>
          Not Found
        </Text>
      </Paper>
    </Box>
  );
}

NotFound.Layout = LandingLayout;

export default NotFound;
