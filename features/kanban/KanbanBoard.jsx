"use client";

import {
  Title,
  Flex,
  Paper,
  Box,
  createStyles,
  SimpleGrid,
  Badge,
  Group,
  Divider,
  TextInput,
  Loader,
  Center,
} from "@mantine/core";
import React from "react";
import { useApplications } from "../../hooks/useApplications";
import AddAppModal from "./AddAppModal";
import Columns from "./components/Columns";

function Board() {
  const { applications } = useApplications();

  if (applications.isLoading) {
    return (
      <>
        <Center mt="10%">
          <AddAppModal />
        </Center>
      </>
    );
  }

  return (
    <>
      <SimpleGrid cols={4}>
        <Columns apps={applications.data} />
      </SimpleGrid>
    </>
  );
}

export default Board;
