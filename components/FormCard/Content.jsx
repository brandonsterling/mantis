import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Grid,
  Group,
  Loader,
  MediaQuery,
  MultiSelect,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  titleInput: {
    paddingLeft: 10,
    fontWeight: 700,
    fontSize: 26,
    lineHeight: 1.35,
    border: "1px solid transparent",

    "&:hover": {
      border: `1px solid ${theme.colors.blue[6]}`,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export function Content({ children }) {
  const { classes } = useStyles();

  return (
    <Grid.Col span={12}>
      <div style={{ height: "100%" }}>
        <Card.Section px="md" inheritPadding>
          {children}
        </Card.Section>
      </div>
    </Grid.Col>
  );
}
