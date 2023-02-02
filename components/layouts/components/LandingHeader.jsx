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
  Button,
  ThemeIcon,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "@supabase/auth-helpers-react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { IoLocateOutline, IoLocationOutline } from "react-icons/io5";

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

export function LandingHeader() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();

  const { classes, cx } = useStyles();
  const user = useUser();

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group>
          <Image width={25} src="/mantis_logo.png" />

          <Text className={classes.title}>mantis</Text>
        </Group>
        <Group>
          <Button
            color="dark"
            variant="outline"
            size="sm"
            component="a"
            href="/sign-in"
          >
            Sign In
          </Button>
          {/* <Button component="a" href="/sign-up">
            Sign Out
          </Button> */}
        </Group>
      </Container>
    </Header>
  );
}
