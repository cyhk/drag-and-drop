import React, { useState } from 'react';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';

const App = () => {
  const [data, setData] = useState(initialData);

  const columns = data.columnOrder.map(columnId => {
    const column = data.columns[columnId];
    const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

    return <Column key={column.id} column={column} tasks={tasks} />;
  });

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

    const column = data.columns[source.droppableId];
    const newTaskIds = [...column.taskIds];
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
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
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      {columns}
    </DragDropContext>
  );
}

export default App;
