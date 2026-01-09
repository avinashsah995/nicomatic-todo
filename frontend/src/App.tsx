import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ListChecks } from 'lucide-react';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import socket from './services/socket';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();

    socket.on('taskCreated', (task: Task) => {
      setTasks((prev) => [task, ...prev]);
    });

    socket.on('taskUpdated', (updatedTask: Task) => {
      setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    });

    socket.on('taskDeleted', (id: number) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title: string) => {
    try {
      await createTask(title);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, completed);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-premium-bg text-slate-100 p-4 md:p-8 font-sans selection:bg-sky-500/30">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center gap-4 mb-12 mt-8">
          <div className="p-3 bg-sky-500/10 rounded-2xl">
            <ListChecks className="text-sky-400" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text pb-1">Our Shared List</h1>
            <p className="text-slate-400">Manage tasks together in real-time.</p>
          </div>
        </header>

        <TaskInput onAdd={handleAddTask} />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 glass rounded-3xl"
                >
                  <p className="text-slate-500 text-lg">No tasks yet. Add one to get started!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
