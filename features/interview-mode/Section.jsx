import { Card, Grid, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

function Section({ section, children, ...props }) {
  return (
    <>
      <div id={section}> </div>
      <div style={{ position: "relative" }}>
        <Card.Section {...props} inheritPadding p="xl">
          <Link href={`#${section}`}>
            <Title my="xl" order={3}>
              {section}
            </Title>
          </Link>

          <Grid mt="sm">{children}</Grid>
        </Card.Section>
      </div>
    </>
  );
}

export default Section;
