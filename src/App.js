import React, { useState } from 'react';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';

const App = () => {
  const [ data, setData ] = useState(initialData);

  const columns = data.columnOrder.map(columnId => {
    const column = data.columns[columnId];
    const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

    return <Column key={column.id} column={column} tasks={tasks} />;
  });

  const onDragEnd = result => {
    
  };

  return <DragDropContext
    onDragEnd={onDragEnd}
  >
    {columns}
  </DragDropContext>
}

export default App;
