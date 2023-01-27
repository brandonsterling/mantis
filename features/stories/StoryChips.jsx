import { Button, Chip } from "@mantine/core";
import React from "react";
import { useStory } from "../../hooks/useStory";

function StoryChips({ selected }) {
  const { relatedApps } = useStory(selected);

  //   if (!relatedApps || !relatedApps.data) {
  //     return <div>loading...</div>;
  //   }

  return (
    <Button>hi</Button>
    // <Chip.Group position="center">
    //   {relatedApps.data.map((app) => (
    //     <Chip value={app.application_id}>{app.applications.title}</Chip>
    //   ))}
    // </Chip.Group>
  );
}

export default StoryChips;
