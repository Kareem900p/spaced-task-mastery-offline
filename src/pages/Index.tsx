
import React from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';

const Index = () => {
  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
};

export default Index;
