import {
  Anchor,
  createStyles,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";

export const BREAKPOINT = 1080;
export const TABLE_OF_CONTENTS_WIDTH = 260;
export const CONTENT_WIDTH = 820;
export const TAB_HEIGHT = 46;
export const TAB_HEIGHT_MOBILE = 38;

const useStyles = createStyles((theme) => ({
  inner: {
    paddingBottom: theme.spacing.xl,
    // paddingLeft: theme.spacing.md,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  linkActive: {
    // borderRightColor: theme.colors.blue[5],
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.green[9], 0.45)
        : theme.colors.green[0],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.green[1]
        : theme.colors.green[8],
  },
  items: {
    // borderRight: `1px solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },
  wrapper: {
    boxSizing: "border-box",
    paddingRight: theme.spacing.md,
    marginTop: theme.spacing.md,
    position: "sticky",
    top: theme.spacing.xl * 3,
    right: 0,
    paddingTop: 10,
    flex: `0 0 ${TABLE_OF_CONTENTS_WIDTH - 20}px`,

    [`@media (max-width: ${BREAKPOINT}px)`]: {
      display: "none",
    },
  },
}));

const headings = ["Questions", "Stories", "Notes"];

function getActiveElement(rects) {
  if (rects.length === 0) {
    return -1;
  }

  const closest = rects.reduce(
    (acc, item, index) => {
      if (Math.abs(acc.position) < Math.abs(item.y)) {
        return acc;
      }

      return {
        index,
        position: item.y,
      };
    },
    { index: 0, position: rects[0].y }
  );

  return closest.index;
}

function TableOfContents() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(0);
  const slugs = useRef();

  useEffect(() => {
    slugs.current = headings.map((heading) => document.getElementById(heading));
  }, [headings]);

  const handleScroll = () => {
    setActive(
      getActiveElement(slugs.current.map((d) => d.getBoundingClientRect()))
    );
  };

  useEffect(() => {
    setActive(
      getActiveElement(slugs.current.map((d) => d.getBoundingClientRect()))
    );
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = headings.map((heading, index) => {
    return (
      <Link
        className={cx(classes.link, {
          [classes.linkActive]: active === index,
        })}
        key={heading}
        href={`#${heading}`}
      >
        <Text
          sx={{ paddingLeft: "20px" }}
          className={cx(classes.link, {
            [classes.linkActive]: active === index,
          })}
          component="a"
          size="sm"
          href={`#${heading}`}
        >
          {heading}
        </Text>
      </Link>
    );
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.inner}>
        <div>
          <ScrollArea.Autosize
            maxHeight="calc(100vh - 140px)"
            type="scroll"
            offsetScrollbars
          >
            <div className={classes.items}>
              <Stack>{items}</Stack>
            </div>
          </ScrollArea.Autosize>
        </div>
      </div>
    </div>
  );
}

export default TableOfContents;
