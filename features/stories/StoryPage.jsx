import { createStyles, Loader, Center } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Side, SideContent, StoryContent } from "./Story";
import { StoryList } from "./components/StoryList";
import FormCard from "../../components/FormCard";
import CreateStory from "./CreateStory";

const useStyles = createStyles((theme) => ({
  main: {
    height: "100%",
    overflow: "hidden",
  },
  grid: {
    position: "relative",
    // display: "flex",
    display: "flex",
    height: "100vh",
  },
  sideCol: {
    borderRight: "1px solid lightgray",
    flexBasis: "30%",
    overflowY: "scroll",
  },
  mainCol: {
    flex: "1 auto",
    flexBasis: "70%",
    marginBottom: 50,
    overflowY: "scroll",
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
    <div className={classes.main}>
      <div className={classes.grid}>
        <div className={classes.sideCol}>
          <StoryList handleClick={handleClick} selected={selected} />
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
    </div>
  );
}
