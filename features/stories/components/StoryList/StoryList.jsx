import {
  createStyles,
  TextInput,
  Loader,
  Center,
  ThemeIcon,
} from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { StoryCard } from "./StoryCard";
import { useStories } from "../../../../hooks/useStories";

import ListContainer from "../../../../components/ListContainer";
import { ListCard } from "../../../../components/ListCard";
import { filterStories } from "../../../../utils/transform";

const useStyles = createStyles((theme) => ({}));

export function StoryList({ handleClick, selected }) {
  const { classes } = useStyles();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { stories } = useStories({
    select: (data) => filterStories(data, search),
  });

  if (!stories.data) {
    return (
      <Center>
        <Loader color="green" variant="dots" />
      </Center>
    );
  }

  const storyCards = stories.data.map((story) => {
    return (
      <ListCard
        onClick={() => handleClick(story.id)}
        title={story.title}
        content={story.content}
        id={story.id}
        selectedId={selected}
      />
    );
  });

  return (
    <>
      <ListContainer
        header="Stories"
        // icon={
        //   <ThemeIcon size="xl" color="orange" variant="light">
        //     <FaBookOpen size={25} />
        //   </ThemeIcon>
        // }
        search={
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            mx="md"
            my="sm"
            placeholder="Search applications"
            icon={<BsSearch size={18} stroke={1.5} />}
            radius="sm"
            size="xs"
          ></TextInput>
        }
        list={storyCards}
      />
    </>
  );
}
