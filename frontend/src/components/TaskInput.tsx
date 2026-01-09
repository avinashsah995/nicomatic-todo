import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
    onAdd: (title: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-2 glass rounded-2xl mb-8">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-100 placeholder:text-slate-500"
            />
            <button
                type="submit"
                disabled={!title.trim()}
                className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-lg shadow-sky-500/20"
            >
                <Plus size={24} />
            </button>
        </form>
    );
};

export default TaskInput;
