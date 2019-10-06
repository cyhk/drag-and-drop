import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.3s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightsalmon' : 'white')};
`;

const Column = ({ column, tasks }) => {
  return <Container>
    <Title>
      {column.title}
    </Title>
    <Droppable 
      droppableId={column.id}
    >
      {(provided, snapshot) => (
        <TaskList 
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  </Container>;
};

export default Column;