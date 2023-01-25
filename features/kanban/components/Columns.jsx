import { SimpleGrid, Flex, createStyles } from "@mantine/core";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ColumnHeader from "./ColumnHeader";
import ColumnBody from "./ColumnBody";
import Job from "./Job";
import { APP_STATES } from "../../../constants/appStates";
import { useApplication } from "../../../hooks/useApplication";

const useStyles = createStyles((theme) => ({
  grid: {
    height: "100vh",
  },
  colWrapper: {
    borderRadius: 10,
    height: "100%",
  },
  colTitle: {
    color: theme.colors.gray[7],
  },
  title: {
    padding: 10,
  },
}));

function Columns({ apps }) {
  const { classes } = useStyles();
  const { update } = useApplication();

  const handleDrop = ({ draggableId, destination, source }) => {
    if (!isPositionChanged(source, destination)) return;

    const currentApp = apps.find((app) => app.id == draggableId);

    const updatedApp = {
      ...currentApp,
      status: destination.droppableId,
      priority: calculateIssueListPosition(
        apps,
        destination,
        source,
        draggableId
      ),
    };

    update.mutate({ appId: draggableId, app: updatedApp });
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      {Object.values(APP_STATES).map((status) => (
        <Flex className={classes.colWrapper} direction="column" mt={10}>
          <ColumnHeader
            apps={apps}
            getLastPosition={getLastPosition}
            key={status}
            name={status}
            jobCount={getSortedListIssues(apps, status).length}
          />
          <Droppable droppableId={status} key={status} direction="vertical">
            {(provided, snapshot) => (
              <Flex
                sx={{ overflowY: "scroll" }}
                direction="column"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ColumnBody
                  isDraggingOver={snapshot.isDraggingOver}
                  key={status}
                  title={status}
                  jobCount={5}
                >
                  {apps
                    .filter((app) => app.status === status)
                    .sort((a, b) => a.priority - b.priority)
                    .map((app, index) => {
                      return (
                        <Draggable
                          key={app.id}
                          index={index}
                          draggableId={`${app.id}`}
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Job job={app}></Job>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                </ColumnBody>
              </Flex>
            )}
          </Droppable>
        </Flex>
      ))}
    </DragDropContext>
  );
}

const isPositionChanged = (destination, source) => {
  if (!destination || !source) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const calculateIssueListPosition = (...args) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);
  let position;
  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.priority - 1;
  } else if (!nextIssue) {
    position = prevIssue.priority + 1;
  } else {
    position =
      prevIssue.priority + (nextIssue.priority - prevIssue.priority) / 2;
  }

  return position;
};

const getAfterDropPrevNextIssue = (
  allIssues,
  destination,
  source,
  droppedIssueId
) => {
  const beforeDropDestinationIssues = getSortedListIssues(
    allIssues,
    destination.droppableId
  );

  const droppedIssue = allIssues.find((issue) => issue.id == droppedIssueId);
  const isSameList = destination.droppableId == source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      )
    : insertItemIntoArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      );
  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues, status) =>
  issues
    .filter((issue) => issue.status === status)
    .sort((a, b) => a.priority - b.priority);

const getLastPosition = (apps, status) => {
  const sortedIssues = getSortedListIssues(apps, status);
  const lastPosition = sortedIssues[sortedIssues.length - 1];
  console.log(lastPosition);
  return lastPosition.priority;
};

export const moveItemWithinArray = (arr, item, newIndex) => {
  const arrClone = [...arr];
  const oldIndex = arrClone.indexOf(item);
  arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
  return arrClone;
};

export const insertItemIntoArray = (arr, item, index) => {
  const arrClone = [...arr];
  arrClone.splice(index, 0, item);
  return arrClone;
};

export const updateArrayItemById = (arr, itemId, fields) => {
  const arrClone = [...arr];
  const item = arrClone.find(({ id }) => id == itemId);

  if (item) {
    const itemIndex = arrClone.indexOf(item);
    arrClone.splice(itemIndex, 1, { ...item, ...fields });
  }
  return arrClone;
};

export default Columns;
