import React from "react";
import Task from "./Task";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.3s ease;
  background-color: ${props =>
    props.isDraggingOver ? "lightsalmon" : "inherit"};
  flex-grow: 1;
  min-height: 100px;
`;

const InnerList = React.memo(({ tasks }) => {
  
  return tasks.map((task, index) => 
    <Task key={task.id} task={task} index={index} />
  );
});

const Column = ({ column, tasks, index, isDropDisabled }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable
            droppableId={column.id}
            type="task"
            // type={column.id === 'column-3' ? 'done' : 'active'}
            isDropDisabled={isDropDisabled}
            direction="vertical"
          >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
