import { useState } from "react";
import {
  createStyles,
  Select,
  Stack,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderRadius: 10,
    marginBottom: 10,
  },
  search: {
    maxWidth: 365,
  },
  filters: {
    display: "flex",
    alignItems: "center",
  },
}));
function Filter() {
  const [search, setSearch] = useState("");
  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };
  const { classes } = useStyles();

  return (
    <Stack className={classes.wrapper}>
      <Select
        label="Status"
        defaultValue="All"
        data={[
          { value: "All", label: "All" },
          { value: "Interviewing", label: "Interviewing" },
        ]}
      />
      <Select
        label="Company"
        defaultValue="All"
        data={[
          { value: "All", label: "All" },
          { value: "Interviewing", label: "Interviewing" },
        ]}
      />
    </Stack>
  );
}

export default Filter;
