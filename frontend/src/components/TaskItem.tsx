import React from 'react';
import { CheckCircle2, Circle, Trash2, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface TaskItemProps {
    task: Task;
    onToggle: (id: number, completed: boolean) => void;
    onEdit: (id: number, title: string) => void;
    onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editTitle, setEditTitle] = React.useState(task.title);

    const handleSave = () => {
        if (editTitle.trim() && editTitle !== task.title) {
            onEdit(task.id, editTitle);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditTitle(task.title);
            setIsEditing(false);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass flex items-center justify-between p-4 mb-3 rounded-xl transition-all hover:bg-white/10 group"
        >
            <div className="flex items-center gap-3 flex-1">
                <button
                    onClick={() => onToggle(task.id, !task.completed)}
                    className={`transition-colors ${task.completed ? 'text-green-400' : 'text-slate-400 hover:text-sky-400'}`}
                >
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>

                {isEditing ? (
                    <input
                        autoFocus
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-b border-sky-500 text-slate-100 focus:outline-none w-full text-lg"
                    />
                ) : (
                    <span
                        className={`text-lg transition-all cursor-pointer select-none flex-1 ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}
                        onDoubleClick={() => {
                            if (!task.completed) setIsEditing(true);
                        }}
                    >
                        {task.title}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!isEditing && !task.completed && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-slate-500 hover:text-sky-400 transition-colors p-2"
                        title="Edit"
                    >
                        <Pencil size={18} />
                    </button>
                )}
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors p-2"
                    title="Delete"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default TaskItem;
