import React, { useState, useEffect } from 'react';

const TaskForm = ({ isOpen, onClose, onAddTask, currentTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('High');

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setDueDate(currentTask.dueDate);
            setPriority(currentTask.priority);
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('High');
        }
    }, [currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description && dueDate && priority) {
            onAddTask({ title, description, dueDate, priority });
            onClose();
        } else {
            alert('All fields are required');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}style={{'backgroundColor':'red'}}>X</button>
                <form onSubmit={handleSubmit}>
                    <h2>{currentTask ? 'Edit Task' : 'Add New Task'}</h2>
                    <input 
                        type="text" 
                        placeholder="Task Title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <textarea 
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input 
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <button type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
