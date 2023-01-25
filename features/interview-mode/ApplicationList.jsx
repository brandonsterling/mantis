import { SimpleGrid, Title } from "@mantine/core";
import React from "react";
import Job from "../kanban/components/Job";

function ApplicationList({ applications, setActive }) {
  const applicationCards = applications.map((app) => (
    <Job setActive={setActive} job={app} />
  ));

  return (
    <>
      <Title mb="sm" order={2}>
        Applications
      </Title>
      <SimpleGrid cols={3}>{applicationCards}</SimpleGrid>
    </>
  );
}

export default ApplicationList;
