import React, { useState, useEffect } from 'react';
import TaskFormModal from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [search, setSearch] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        if (currentTask) {
            // Edit mode: update the existing task
            setTasks(tasks.map(t => t.id === currentTask.id ? { ...task, id: currentTask.id, status: currentTask.status } : t));
        } else {
            // Add mode: add a new task
            const newTask = { ...task, id: Date.now(), status: 'pending' };
            setTasks([...tasks, newTask]);
        }
        setIsModalOpen(false); // Close the modal after adding/updating the task
        setCurrentTask(null);  // Reset currentTask after adding/updating
    };

    const openEditTaskModal = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const toggleTaskStatus = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filterTasks = () => {
        return tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                                  task.description.toLowerCase().includes(search.toLowerCase());
            const matchesPriority = filterPriority ? task.priority === filterPriority : true;
            const matchesStatus = filterStatus ? task.status === filterStatus : true;
            return matchesSearch && matchesPriority && matchesStatus;
        });
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            
            <div className="filters">
                <input 
                    type="text" 
                    placeholder="Search tasks" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    value={filterPriority} 
                    onChange={(e) => setFilterPriority(e.target.value)}
                >
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            <button onClick={() => { setCurrentTask(null); setIsModalOpen(true); }}>Add New Task</button>

            <TaskFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTask={addTask}
                currentTask={currentTask}
            />

            <TaskList 
                tasks={filterTasks()} 
                onEdit={openEditTaskModal}
                onToggleStatus={toggleTaskStatus} 
                onDelete={deleteTask} 
            />
        </div>
    );
};

export default App;
