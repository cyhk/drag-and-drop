const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage'},
    'task-2': { id: 'task-2', content: 'Make dinner'},
    'task-3': { id: 'task-3', content: 'Watch a film' }
  }, columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'column-2': {
      id: 'column-2',
      title: 'To do',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'To do',
      taskIds: []
    },

  }, 
  columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData;