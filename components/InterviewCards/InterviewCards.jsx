import {
  createStyles,
  Card,
  Text,
  Group,
  Stack,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export function InterviewCards({ data }) {
  const { classes } = useStyles();

  const cards = data.map((item) => {
    return (
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group noWrap spacing={0}>
          <div className={classes.body}>
            <Text transform="uppercase" color="dimmed" weight={700} size="xs">
              {item.company}
            </Text>
            <Text className={classes.title} mt="xs" mb="md">
              {item.name}
            </Text>
          </div>
        </Group>
      </Card>
    );
  });

  return <Stack>{cards}</Stack>;
}
