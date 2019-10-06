import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [data, setData] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState(null);

  const columns = data.columnOrder.map(columnId => {
    const column = data.columns[columnId];
    const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

    return <Column key={column.id} column={column} tasks={tasks} />;
  });

  const onDragStart = start => {
    const homeIndex = data.columnOrder.indexOf(start.source.droppableId);

    setHomeIndex(homeIndex);
  }

  const onDragEnd = result => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

    if (type === 'column') {
      const newColumnOrder = [...data.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder
      }
      
      setData(newState);

      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = [...start.taskIds];

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };
  
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        }
      }
  
      setData(newData);
      return;
    } 

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = [...finish.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...data,
      columns:{
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    setData(newState);
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId = 'all-columns'
        direction='horizontal'
        type='column'
      >
        {provided => (
        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {data.columnOrder.map(
            (columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map(
                taskId => data.tasks[taskId]
              )

              const isDropDisabled = index < homeIndex;

              return (
              <Column 
                key={column.id}
                column={column}
                tasks={tasks}
                index={index}
                isDropDisabled={isDropDisabled}/>
              );
            }
          )}
        </Container>)}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
