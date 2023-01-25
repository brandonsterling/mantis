import React, { useState } from "react";
import {
  Tabs,
  createStyles,
  Loader,
  Center,
  SegmentedControl,
  Card,
} from "@mantine/core";
import Info from "./components/Tabs/Info";
import Notes from "./components/Tabs/Notes";
import StyledTabs from "./components/Tabs/StyledTabs";
import QuestionTab from "../../../questions/QuestionTab";

function ProfileTabs({ data, appId }) {
  const useStyles = createStyles((theme) => ({
    tabLabel: {
      "&[data-active]": {
        fontWeight: 500,
        color: theme.black,
      },
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.black,
      },
    },
    tab: {
      overflow: "visible",
      ...theme.fn.focusStyles(),
    },
  }));
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState("info");

  return (
    <Card sx={{ minHeight: "600px", marginBottom: 50 }} withBorder>
      {!data ? (
        <Center mt={150}>
          <Loader color="green" variant="dots" />
        </Center>
      ) : (
        <StyledTabs
          value={activeTab}
          className={classes.tab}
          color="default"
          variant="pills"
        >
          <Tabs.List mt="md">
            <SegmentedControl
              onChange={setActiveTab}
              fullWidth
              data={[
                { label: "Info", value: "info" },
                // { label: "Contacts", value: "notes" },
                { label: "Questions", value: "questions" },

                { label: "Notes", value: "notes" },
              ]}
            />
          </Tabs.List>

          <Info activeTab={activeTab} application={data} appId={appId} />
          <QuestionTab activeTab={activeTab} data={data} appId={appId} />

          {/* <Questions activeTab={activeTab} data={data} appId={appId} /> */}
          <Notes appId={appId} notes={data.notes} />
        </StyledTabs>
      )}
    </Card>
  );
}

export default ProfileTabs;
