import {
  createStyles,
  Loader,
  Center,
  Grid,
  Card,
  CloseButton,
  ActionIcon,
  Group,
} from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Side, SideContent, StoryContent } from "./Story";
import { StoryList } from "./components/StoryList";
import FormCard from "../../components/FormCard";
import CreateStory from "./CreateStory";
import { useStory } from "../../hooks/useStory";
import { IoTrashOutline } from "react-icons/io5";

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

    overflowY: "scroll",

    backgroundColor: theme.colors.gray[0],
  },
}));

const FormHeader = ({ handleClose, handleDelete }) => {
  return (
    <Card.Section pt="md" inheritPadding>
      <Group position="apart">
        <CloseButton onClick={() => handleClose()} />
        <ActionIcon onClick={() => handleDelete()}>
          <IoTrashOutline />
        </ActionIcon>
      </Group>
    </Card.Section>
  );
};

export function StoryPage() {
  const { classes } = useStyles();
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const { id } = router.query;
  const { deleteStory } = useStory();

  const handleClick = (storyId) => {
    if (router.pathname.includes("stories")) {
      router.push(`/stories/${storyId}`);
    }
    setSelected(storyId);
  };

  const handleDelete = () => {
    deleteStory.mutate(selected);
    handleClose();
  };

  const handleClose = () => {
    setSelected(null);
    router.push(`/stories`);
  };

  useEffect(() => {
    if (id && id[0] !== selected) {
      setSelected(id[0]);
    }
  }, [router]);

  return (
    <div className={classes.main}>
      <div className={classes.grid}>
        <div className={classes.sideCol}>
          <StoryList handleClick={handleClick} selected={selected} />
        </div>
        <div className={classes.mainCol}>
          <FormCard>
            {!selected ? (
              <Grid m="0">
                <CreateStory />
              </Grid>
            ) : (
              <>
                <FormHeader
                  handleClose={handleClose}
                  handleDelete={handleDelete}
                />

                <Grid m="0">
                  <StoryContent selected={selected} />
                </Grid>
              </>
            )}
          </FormCard>
        </div>
      </div>
    </div>
  );
}
