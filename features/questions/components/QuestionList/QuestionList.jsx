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
import { useQuestions } from "../../../../hooks/useQuestions";

import ListContainer from "../../../../components/ListContainer";
import { ListCard } from "../../../../components/ListCard";
import { filterQuestions } from "../../../../utils/transform";

const useStyles = createStyles((theme) => ({}));

export function QuestionList({ handleClick, selected }) {
  const { classes } = useStyles();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { questions } = useQuestions({
    select: (data) => filterQuestions(data, search),
  });

  if (!questions.data) {
    return (
      <Center>
        <Loader color="green" variant="dots" />
      </Center>
    );
  }

  const questionCards = questions.data.map((question) => {
    return (
      <ListCard
        onClick={() => handleClick(question.id)}
        title={question.question}
        content={question.answer}
        id={question.id}
        selectedId={selected}
      />
    );
  });

  return (
    <>
      <ListContainer
        header="Questions"
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
            placeholder="Search questions"
            icon={<BsSearch size={18} stroke={1.5} />}
            radius="sm"
            size="xs"
          ></TextInput>
        }
        list={questionCards}
      />
    </>
  );
}
