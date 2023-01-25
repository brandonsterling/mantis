import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  createStyles,
  Grid,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { RTE } from "../../components/RTE";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },

  title: {
    display: "block",
    // marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
  rteRoot: {
    border: `1px solid transparent`,
  },
  rteContent: {
    color: theme.colors.gray[6],
    paddingLeft: "0px",
  },
}));

export function InterviewCard({ title, content }) {
  const { classes, cx, theme } = useStyles();
  const { hovered, ref } = useHover();

  return (
    <Grid.Col ref={ref} span={6}>
      <Card withBorder radius="md" className={classes.card}>
        <Text className={classes.title} weight={500}>
          {title}
        </Text>

        <RTE
          classNames={{ root: classes.rteRoot, content: classes.rteContent }}
          editable={false}
          content={content}
        />
      </Card>
    </Grid.Col>
  );
}
