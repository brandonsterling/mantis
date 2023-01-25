import { BsCircleFill, BsCircleHalf } from "react-icons/bs";

export const APP_STATES = {
  0: "Bookmarked",
  1: "Applied",
  2: "Interviewing",
  3: "Offered",
};

export const APP_STATES_ICON = {
  Bookmarked: {
    color: "blue",
    icon: <BsCircleFill color="gray" />,
  },
  Applied: {
    color: "blue",
    icon: <BsCircleFill color="gold" />,
  },
  Interviewing: {
    color: "blue",
    icon: <BsCircleFill color="blue" />,
  },
  Offered: {
    color: "blue",
    icon: <BsCircleFill color="green" />,
  },
  Rejected: {
    color: "blue",
    icon: <BsCircleFill color="red" />,
  },
};
