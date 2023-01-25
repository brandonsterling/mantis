"use client";
import {
  createStyles,
  Navbar,
  UnstyledButton,
  Badge,
  Text,
  Group,
  Title,
  Image,
  Button,
  ThemeIcon,
  Stack,
  Avatar,
} from "@mantine/core";
import { BsChatDots, BsFillBriefcaseFill } from "react-icons/bs";
import { IoBook, IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineDocumentText, HiOutlineBookOpen } from "react-icons/hi";

import { BsQuestionCircle } from "react-icons/bs";

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    title: {
      color: theme.black,
      fontSize: 30,
      fontFamily: `Nunito, ${theme.fontFamily}`,
      fontWeight: 700,
    },

    navbar: {
      position: "fixed",
      paddingTop: 0,
      backgroundColor: "white",
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
    },

    section: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      marginBottom: theme.spacing.md,
    },

    searchCode: {
      fontWeight: 700,
      fontSize: 10,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2]
      }`,
    },

    mainLinks: {
      paddingLeft: theme.spacing.md - theme.spacing.xs,
      paddingRight: theme.spacing.md - theme.spacing.xs,
      paddingBottom: theme.spacing.md,
    },

    mainLink: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      fontSize: theme.fontSizes.md,
      padding: `8px ${theme.spacing.md}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },

    mainLinkInner: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },

    mainLinkIcon: {
      marginRight: theme.spacing.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
    },

    mainLinkBadge: {
      padding: 0,
      width: 20,
      height: 20,
      pointerEvents: "none",
    },

    collections: {
      paddingLeft: theme.spacing.md - 6,
      paddingRight: theme.spacing.md - 6,
      paddingBottom: theme.spacing.md,
    },

    collectionsHeader: {
      paddingLeft: theme.spacing.md + 2,
      paddingRight: theme.spacing.md,
      marginBottom: 5,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.md,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.black : theme.black,
        },
      },
    },
    linkIcon: {
      color:
        theme.colorScheme === "dark" ? theme.colors.black : theme.colors.black,
      marginRight: theme.spacing.sm,
    },
    linkIconActive: {
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,

      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  };
});

const links = [{ label: "Tasks", notifications: 4 }, { label: "Contacts" }];

const collections = [
  {
    emoji: "👍",
    label: "Applications",
    link: "/applications",
    icon: HiOutlineDocumentText,
  },
  {
    emoji: "🚚",
    label: "Stories",
    link: "/stories",
    icon: HiOutlineBookOpen,
  },
  {
    emoji: "💸",
    label: "Questions",
    link: "/questions",
    icon: BsQuestionCircle,
  },
];

export function MainNav() {
  const { classes, cx } = useStyles();
  const supabaseClient = useSupabaseClient();
  const [active, setActive] = useState("Applications");
  const router = useRouter();

  const collectionLinks = collections.map((item) => (
    <UnstyledButton onClick={() => router.push(item.link)}>
      {/* <Link href={item.link} legacyBehavior> */}
      <div
        className={cx(classes.link, {
          [classes.linkActive]: router.pathname.includes(item.link),
        })}
        href={item.link}
        key={item.label}
        onClick={() => {
          setActive(item.label);
        }}
      >
        <item.icon
          size={20}
          className={cx(classes.linkIcon, {
            [classes.linkIconActive]: router.pathname.includes(item.link),
          })}
          // stroke={1.5}
        />
        <span>{item.label}</span>
      </div>
      {/* </Link> */}
    </UnstyledButton>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" pl="lg" className={classes.navbar}>
      <Navbar.Section p={5} className={classes.header}>
        <Group>
          <Avatar src="https://bookface-images.s3.amazonaws.com/small_logos/7c7eb248f9e6c7fc15d545fe32d2657bb2d2fb35.png" />
          <Text className={classes.title}>mantis</Text>
        </Group>
      </Navbar.Section>

      <Button
        mb="md"
        leftIcon={<BsChatDots />}
        fullWidth
        component="a"
        href="/interview-mode"
        color="dark"
        variant="default"
      >
        Enter Interview Mode
      </Button>
      <Navbar.Section className={classes.section}>
        {/* <div className={classes.mainLinks}>{mainLinks}</div> */}
      </Navbar.Section>

      <Navbar.Section grow className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="md" weight={500} color="dimmed"></Text>
        </Group>
        <div className={classes.collections}>
          <Stack spacing="xs">{collectionLinks}</Stack>
        </div>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <Button
          mb="md"
          fullWidth
          color="dark"
          variant="default"
          onClick={() => {
            supabaseClient.auth.signOut(), router.push("/");
          }}
        >
          Log Out
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}
