import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const getTasks = () => api.get('/tasks');
export const createTask = (title: string) => api.post('/tasks', { title });
export const updateTask = (id: number, completed: boolean) => api.patch(`/tasks/${id}`, { completed });
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);

export default api;
