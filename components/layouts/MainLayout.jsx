import { AppShell } from "@mantine/core";
import { MainNav } from "../MainNav";

function MainLayout({ children }) {
  return (
    <AppShell
      padding="xs"
      navbar={<MainNav />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}

export default MainLayout;
