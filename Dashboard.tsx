import React from 'react';
import EventManager from '../components/EventManager';
import TaskTracker from '../components/TaskTracker';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1 className="text-center font-bold text-2xl">Event Management Dashboard</h1>
      <EventManager />
      <TaskTracker />
    </div>
  );
};

export default Dashboard;
