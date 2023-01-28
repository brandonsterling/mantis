import { Center, Loader, SimpleGrid, Title } from "@mantine/core";
import React from "react";
import Job from "../kanban/components/Job";

function ApplicationList({ applications, setActive }) {
  if (applications.isLoading) {
    return (
      <Center>
        <Loader variant="dots" size="lg" />
      </Center>
    );
  }

  const applicationCards = applications.data.map((app) => (
    <Job setActive={setActive} job={app} />
  ));

  return (
    <>
      {/* <Title mb="sm" order={2}>
        Applications
      </Title> */}
      <SimpleGrid cols={3}>{applicationCards}</SimpleGrid>
    </>
  );
}

export default ApplicationList;
