import { forwardRef, useState } from "react";
import {
  MultiSelect,
  Box,
  CloseButton,
  Badge,
  createStyles,
} from "@mantine/core";
import { BsChevronBarDown } from "react-icons/bs";
import { useEffect } from "react";
import { useApplications } from "../../hooks/useApplication";

const useStyles = createStyles((theme) => ({
  input: {
    padding: 10,
    backgroundColor: theme.white,
  },
}));

function Value({
  value,
  label,
  onRemove,
  handleRemove,
  classNames,
  ...others
}) {
  return (
    // <div style={{ margin: "calc(10px / 2 - 2px) calc(10px / 2)" }} {...others}>
    //   <Box
    //     sx={(theme) => ({
    //       display: "flex",
    //       cursor: "default",
    //       alignItems: "center",

    //       borderRadius: 4,
    //     })}
    //   >
    //     <div>
    //       <Badge
    //         variant="outline"
    //         sx={{ lineHeight: 1, paddingLeft: 10 }}
    //         rightSection={
    //           <CloseButton
    //             onMouseDown={(e) => handleRemove(e, value)}
    //             variant="transparent"
    //             size={22}
    //             iconSize={14}
    //             tabIndex={-1}
    //           />
    //         }
    //       >
    //         {label}
    //       </Badge>
    //     </div>
    //   </Box>
    // </div>
    <div style={{ margin: "calc(10px / 2 - 2px) calc(10px / 2)" }} {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <Box sx={{ lineHeight: 1.5, fontSize: 12 }}>{label}</Box>
        <CloseButton
          onMouseDown={(e) => handleRemove(e, value)}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

export default function StoryMultiSelect({
  selected,
  relatedStoryData,
  addLink,
  removeLink,
  ...props
}) {
  const { classes } = useStyles();

  const { data: applications } = useApplications();

  const [selectedApps, setSelectedApps] = useState([]);
  const [companies, setData] = useState([]);

  // const { data: applications } = useApplications();
  const thisapp = relatedStoryData?.map((app) => app.application_id) || [];

  useEffect(() => {
    if (applications) {
      let normalizedApps = [...applications];
      normalizedApps.forEach((item) => {
        item.value = item.id;
        item.label = `${item.role} - ${item.company}`;
      });
      setData(normalizedApps);
    }
  }, [applications]);

  const handleChange = (val) => {
    addLink.mutate({ storyId: selected, appId: val });
  };

  const handleRemove = (e, value) => {
    removeLink.mutate({ storyId: selected, appId: value });
  };

  const Item = forwardRef(({ label, value, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Box
          onMouseDown={() => handleChange(value)}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <div>{label}</div>
        </Box>
      </div>
    );
  });
  return (
    <MultiSelect
      classNames={{
        input: classes.input,
      }}
      data={companies}
      limit={20}
      value={thisapp}
      valueComponent={({ value, label, onRemove }) => (
        <Value
          value={value}
          label={label}
          onRemove={onRemove}
          handleRemove={handleRemove}
        />
      )}
      itemComponent={Item}
      searchable
      rightSectionWidth="0"
      rightSection={<BsChevronBarDown />}
      placeholder="Link this story to your applications"
      {...props}
    />
  );
}
