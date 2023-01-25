import {
  createStyles,
  Avatar,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
} from "@mantine/core";

const mockdata = [
  { title: "Glassdoor", logo: "https://logo.clearbit.com/glassdoor.com" },

  { title: "HBR", logo: "https://logo.clearbit.com/hbr.org" },
  { title: "Leetcode", logo: "https://logo.clearbit.com/leetcode.com" },
  { title: "Indeed", logo: "https://logo.clearbit.com/indeed.com" },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

export default function ResourcesGrid() {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <Avatar sx={{ objectFit: "contain" }} src={item.logo} />

      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
      <Text className={classes.title}>Resources</Text>

      <SimpleGrid cols={2} mt="md">
        {items}
      </SimpleGrid>
    </>
  );
}
