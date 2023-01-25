import { ActionIcon } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import React from "react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useRelatedQuestion } from "../../../hooks/useRelatedQuestion";

function FavoriteButton({ status, question_id, application_id }) {
  const [value, setValue] = useState(status);
  const { update } = useRelatedQuestion();

  const handleClick = (e) => {
    update.mutate({
      application_id: application_id,
      question_id: question_id,
      relatedData: { favorite: !value },
    });
    setValue(!value);
    e.stopPropagation();
  };

  return (
    <ActionIcon onClick={(e) => handleClick(e)} variant="transparent">
      <AiFillStar
        strokeWidth={20}
        // stroke="black"
        color="lightgray"
        fill={value ? "gold" : "none"}
        size={20}
      />
    </ActionIcon>
  );
}

export default FavoriteButton;
