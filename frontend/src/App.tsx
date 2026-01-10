import { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ListChecks, Search, Filter } from 'lucide-react';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import socket from './services/socket';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

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
      await updateTask(id, { completed });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditTask = async (id: number, title: string) => {
    try {
      await updateTask(id, { title });
    } catch (error) {
      console.error('Error updating task title:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'active'
            ? !task.completed
            : task.completed;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, filter]);

  return (
    <div className="h-screen bg-premium-bg text-slate-100 p-4 md:p-6 font-sans selection:bg-sky-500/30 flex flex-col">
      <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
        {/* Sticky Header Section */}
        <div className="flex-none mb-4">
          <header className="flex flex-col md:flex-row md:items-center justify-between md:gap-4 gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/10 rounded-xl">
                <ListChecks className="text-sky-400 md:w-6 w-4 md:h-6 h-4" />
              </div>
              <h1 className="md:text-2xl text-xl font-bold gradient-text">Shared List</h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative group flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-slate-800 transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex p-1 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                {(['all', 'active', 'completed'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${filter === f
                      ? 'bg-sky-500/10 text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <TaskInput onAdd={handleAddTask} />
        </div>

        {/* Scrollable List Section */}
        {loading ? (
          <div className="flex-1 flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto min-h-0 space-y-2 pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 glass rounded-2xl mx-1"
                >
                  <Filter className="mx-auto text-slate-600 mb-2" size={32} />
                  <p className="text-slate-500">
                    {searchQuery
                      ? 'No tasks match your search.'
                      : filter !== 'all'
                        ? `No ${filter} tasks found.`
                        : 'No tasks yet. Add one above!'}
                  </p>
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
