import {
  Accordion,
  Button,
  createStyles,
  Box,
  Group,
  Text,
} from "@mantine/core";
import React, { useState } from "react";

const useStyles = createStyles((theme) => ({
  control: {
    padding: 0,
  },
  label: {
    fontWeight: 500,
  },
  content: {
    paddingLeft: 0,
  },

  chevron: {
    marginLeft: 0,
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
}));

function AccordionControl(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Accordion.Control {...props} />
    </Box>
  );
}

function DetailAccordion() {
  const { classes } = useStyles();
  const [value, setValue] = useState(null);

  const editButton = () => {
    if (value) {
      return (
        <Button style={{ height: "100%" }} compact variant="subtle">
          Edit
        </Button>
      );
    }
  };

  return (
    <Accordion
      value={value}
      onChange={setValue}
      sx={{ maxWidth: 420 }}
      variant="filled"
      classNames={classes}
    >
      <Accordion.Item value="customization">
        <AccordionControl>
          <Group position="apart">
            <Text>Job Description</Text>
            {editButton()}
          </Group>
        </AccordionControl>
        <Accordion.Panel>
          Colors, fonts, shadows and many other parts are customizable to fit
          your design needs
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default DetailAccordion;
