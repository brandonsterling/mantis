import {
  createStyles,
  Container,
  Title,
  Button,
  Group,
  Image,
  Text,
  List,
  ThemeIcon,
  Center,
  Paper,
} from "@mantine/core";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl,
  },

  content: {
    alignSelf: "center",
    // maxWidth: 480,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    // flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    // backgroundColor: theme.fn.variant({
    //   variant: "light",
    //   color: theme.primaryColor,
    // }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export function Hero() {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Container size="xl">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Group position="center">
            <Title className={classes.title}>
              Make your
              <Text
                className={classes.highlight}
                component="span"
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
              >
                dream job
              </Text>
              a reality
            </Title>
            <Text color="dimmed">
              Track your job applications and keep your job search organized,
              all in one place.
            </Text>
          </Group>

          <Group position="center" mt={30}>
            <Button
              onClick={() => router.push("/sign-in")}
              radius="xl"
              color="dark"
              size="md"
              className={classes.control}
            >
              Get started
            </Button>
            {/* <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Source code
              </Button> */}
          </Group>
        </div>
      </div>
      <Paper shadow="lg">
        <Image
          src="/kanban_demo.png"
          ml="auto"
          mr="auto"
          className={classes.image}
        />
      </Paper>
    </Container>
  );
}
