import {
  createStyles,
  TextInput,
  Loader,
  Center,
  ThemeIcon,
  Divider,
  Group,
  CloseButton,
  Card,
  Grid,
  Button,
  ActionIcon,
} from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsQuestionSquare, BsSearch } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import FormCard from "../../components/FormCard";
import Protected from "../../components/layouts/Protected";
import ListContainer from "../../components/ListContainer";
import { QuestionList } from "../../features/questions/components/QuestionList";
import CreateQuestion from "../../features/questions/CreateQuestion";
import { CardContent } from "../../features/questions/Question";
import { QuestionCard } from "../../features/questions/QuestionCard";
import { useQuestion } from "../../hooks/useQuestion";
import { useQuestions } from "../../hooks/useQuestions";
const useStyles = createStyles((theme) => ({
  // grid: {
  //   position: "relative",
  //   display: "flex",
  //   overflow: "hidden",
  //   alignItems: "stretch",
  //   placeContent: "stretch",
  //   height: "100%",
  // },
  // sideCol: {
  //   display: "flex",
  //   flexDirection: "column",
  //   position: "relative",

  //   overflow: "hidden",
  //   flexBasis: "30%",
  //   flexShrink: 0,
  // },

  // mainCol: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "space-between",
  //   alignItems: "stretch",
  //   overflow: "hidden",
  //   flexBasis: "70%",

  //   backgroundColor: "#f6f8fa",
  // },
  main: {
    height: "100%",
    overflow: "hidden",
  },
  grid: {
    position: "relative",
    display: "flex",
    height: "100vh",
  },
  sideCol: {
    borderRight: "1px solid lightgray",
    flexBasis: "30%",
    overflowY: "scroll",
  },
  mainCol: {
    backgroundColor: theme.colors.gray[0],
    // flex: "1 auto",
    flexBasis: "70%",
    // paddingBottom: 50,
    overflow: "hidden",
  },
}));

function Page() {
  const { classes } = useStyles();
  const router = useRouter();
  const { questions } = useQuestions();
  const { deleteQuestion } = useQuestion();
  const [selected, setSelected] = useState(null);
  const { id } = router.query;
  const { data } = questions;

  const handleClick = (questionId) => {
    if (router.pathname.includes("questions")) {
      router.push(`/questions/${questionId}`);
    }
    setSelected(questionId);
  };

  const handleDelete = () => {
    deleteQuestion.mutate(selected);
    handleClose();
  };

  const handleClose = () => {
    setSelected(null);
    router.push(`/questions`);
  };

  useEffect(() => {
    if (id && id[0] !== selected) {
      setSelected(id[0]);
    }
  }, [router]);

  if (!questions || !data) {
    return (
      <Center>
        <Loader color="green" variant="dots" />
      </Center>
    );
  }

  const FormHeader = () => {
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

  return (
    // <div className={classes.grid}>
    //   <div className={classes.sideCol}>
    //     <QuestionList handleClick={handleClick} selected={selected} />
    //   </div>

    //   <div className={classes.mainCol}>
    //     <FormCard>
    //       {!selected ? <CreateQuestion /> : <CardContent selected={selected} />}
    //     </FormCard>
    //   </div>
    // </div>
    <div className={classes.main}>
      <div className={classes.grid}>
        <div className={classes.sideCol}>
          <QuestionList handleClick={handleClick} selected={selected} />
        </div>

        <div className={classes.mainCol}>
          <FormCard>
            {!selected ? (
              <Grid m="0">
                <CreateQuestion />
              </Grid>
            ) : (
              <>
                <FormHeader />
                <Grid m="0">
                  <CardContent selected={selected} />
                </Grid>
              </>
            )}
          </FormCard>
        </div>
      </div>
    </div>
  );
}

Page.Layout = Protected;

export default Page;
