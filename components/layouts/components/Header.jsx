import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Title,
  Image,
  ActionIcon,
  Select,
  Center,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "@supabase/auth-helpers-react";
import { BsArrowLeft } from "react-icons/bs";
import { useApplications } from "../../../hooks/useApplication";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "fixed",
  },
  title: {
    color: theme.black,
    fontSize: 30,
    fontFamily: `Nunito, ${theme.fontFamily}`,
    fontWeight: 700,
  },
  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    height: HEADER_HEIGHT,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const links = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Applications",
    link: "/",
  },
  {
    label: "Stories",
    link: "/",
  },
  {
    label: "Interview Mode",
    link: "/",
  },
];

export function HeaderResponsive() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { data, isLoading } = useApplications();
  const router = useRouter();
  const { id } = router.query;
  const [appData, setData] = useState();

  const [active, setActive] = useState("");
  const { classes, cx } = useStyles();
  const user = useUser();

  useEffect(() => {
    if (!isLoading) {
      let normalizedApps = [...data];
      normalizedApps.forEach((item) => {
        item.value = item.id;
        item.label = `${item.role} - ${item.company}`;
      });

      setData(normalizedApps);
    }
  }, [data]);

  useEffect(() => {
    setActive(id ? id[0] : id);
  }, [router.isReady]);

  if (isLoading) {
    return;
  }

  return (
    <Header height={HEADER_HEIGHT}>
      <Container fluid size="xl" className={classes.header}>
        <Group>
          <ActionIcon>
            <BsArrowLeft size={20} />
          </ActionIcon>
          <Group>
            <Image width={25} src="/mantis_logo.png" />

            <Text className={classes.title}>mantis</Text>
          </Group>
        </Group>
        <Center>
          {/* {appData && (
            <Select onChange={setActive} value={active} data={appData} />
          )} */}
        </Center>
      </Container>
    </Header>
  );
}
