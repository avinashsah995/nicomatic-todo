import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface TaskItemProps {
    task: Task;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass flex items-center justify-between p-4 mb-3 rounded-xl transition-all hover:bg-white/10"
        >
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onToggle(task.id, !task.completed)}
                    className={`transition-colors ${task.completed ? 'text-green-400' : 'text-slate-400 hover:text-sky-400'}`}
                >
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                <span className={`text-lg transition-all ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {task.title}
                </span>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                className="text-slate-500 hover:text-red-400 transition-colors p-2"
            >
                <Trash2 size={20} />
            </button>
        </motion.div>
    );
};

export default TaskItem;
