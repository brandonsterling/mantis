import { createStyles, Loader, Center } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Side, SideContent, StoryContent } from "./Story";
import { StoryList } from "./components/StoryList";
import FormCard from "../../components/FormCard";
import CreateStory from "./CreateStory";

const useStyles = createStyles((theme) => ({
  grid: {
    alignItems: "stretch",
    placeContent: "stretch",
    display: "flex",
    flexDirection: "row",
    boxSizing: "border-box",
    height: "100%",
    backgroundColor: theme.white,
  },
  sideCol: {
    flexBasis: "30%",
    overflow: "auto",

    maxWidth: "30%",
  },

  sideContent: {
    left: "0px",
    top: "5px",
  },

  mainCol: {
    overflow: "hidden",
    borderLeft: "1px solid rgb(239, 241, 244)",
    flexBasis: "70%",
    maxWidth: "70%",
  },
}));

export function StoryPage() {
  const { classes } = useStyles();
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const handleClick = (storyId) => {
    // if (router.pathname.includes("stories")) {
    //   router.push(`/stories/${storyId}`);
    // }
    setSelected(storyId);
  };

  return (
    <div className={classes.grid}>
      <div className={classes.sideCol}>
        <div className={classes.sideContent}>
          <StoryList handleClick={handleClick} selected={selected} />
        </div>
      </div>
      <div className={classes.mainCol}>
        <FormCard>
          {!selected ? (
            <CreateStory />
          ) : (
            <>
              <StoryContent selected={selected} />
              <SideContent selected={selected} />
            </>
          )}
        </FormCard>
      </div>
    </div>
  );
}
