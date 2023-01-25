import {
  ActionIcon,
  Card,
  Text,
  createStyles,
  Group,
  Badge,
  FocusTrap,
} from "@mantine/core";
import React from "react";
import { useInputState, useToggle } from "@mantine/hooks";
import PlainTextContainer from "../../../PlainTextContainer";
import { HiPencil } from "react-icons/hi";
import { BiExpandAlt } from "react-icons/bi";

const useStyles = createStyles((theme) => ({
  item: {
    "&[data-active]": {
      backgroundColor: "transparent",
    },
  },
  control: {
    "&[data-active]": {
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

function QuestionCard({ question, answer }) {
  const [expanded, toggle] = useToggle();
  const [isEditing, toggleEditing] = useToggle();
  const [vals, setVals] = useInputState(answer);

  return (
    <Card my={10} withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>{question}</Text>
          <Group>
            <ActionIcon onClick={() => toggleEditing()}>
              <HiPencil />
            </ActionIcon>
            <ActionIcon onClick={() => toggle()}>
              <BiExpandAlt />
            </ActionIcon>
          </Group>
        </Group>
        <FocusTrap active={isEditing}>
          <div>
            <PlainTextContainer
              data-autofocus
              readOnly={isEditing ? false : true}
              autosize={expanded || isEditing}
              lineClamp={expanded || isEditing ? "" : 4}
              value={vals}
              onChange={setVals}
            />
          </div>
        </FocusTrap>

        <Badge size="xs">COMPANY SPECIFIC</Badge>
      </Card.Section>
    </Card>
  );
}

export default QuestionCard;
