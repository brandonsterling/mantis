import { useState } from "react";
import {
  createStyles,
  Table,
  Card,
  Group,
  Checkbox,
  Text,
} from "@mantine/core";
import StatusSelect from "./StatusSelect";
import { jobsData } from "../../constants/jobs";
import { useRouter } from "next/navigation";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },

  header: {
    maxHeight: "20px",
    backgroundColor: theme.colors.gray[0],
  },

  card: {
    overflow: "visible",
  },
  checkbox: {
    fontSize: 0,
    lineHeight: 10,
    padding: "0px",
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[0],
    },
  },
}));

export default function JobTable({ setDrawer }) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([]);
  const data = jobsData;
  const router = useRouter();

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr
        onClick={() =>
          router.push(`/dashboard?jobId=${item.id}`, undefined, {
            shallow: true,
          })
        }
        key={item.id}
        className={classes.row}
      >
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.company}</td>
        <td>
          <StatusSelect item={item} />
        </td>
        <td>
          <Text size="sm" weight={500}>
            11/30/2022
          </Text>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Card className={classes.card} withBorder>
        <Card.Section>
          <Table
            sx={{ minWidth: 800, borderRadius: "20px", height: "100%" }}
            verticalSpacing="xs"
          >
            <thead className={classes.header}>
              <tr className={classes.header}>
                <th>
                  {" "}
                  <Checkbox
                    className={classes.checkbox}
                    onChange={() => toggleAll()}
                    checked={selection.length === data.length}
                    indeterminate={
                      selection.length > 0 && selection.length !== data.length
                    }
                    transitionDuration={0}
                  />
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Card.Section>
      </Card>
    </>
  );
}
