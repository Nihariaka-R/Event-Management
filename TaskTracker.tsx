import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { toast } from 'react-toastify';
import ProgressBar from './ProgressBar';

const TaskTracker: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const socket = useSocket('http://localhost:5000');

  useEffect(() => {
    if (socket) {
      socket.on('taskStatusUpdate', (updatedTask: any) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      });
    }

    return () => {
      if (socket) {
        socket.off('taskStatusUpdate');
      }
    };
  }, [socket]);

  const toggleTaskStatus = (taskId: string) => {
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (updatedTask) {
      updatedTask.status = updatedTask.status === 'Pending' ? 'Completed' : 'Pending';
      setTasks([...tasks]);
      socket.emit('updateTask', updatedTask);
      toast.success('Task status updated!');
    }
  };

  return (
    <div className="task-tracker">
      <h2>Task Tracker</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>{task.name}</p>
            <ProgressBar percentage={task.status === 'Completed' ? 100 : 0} />
            <button onClick={() => toggleTaskStatus(task.id)}>
              {task.status}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
