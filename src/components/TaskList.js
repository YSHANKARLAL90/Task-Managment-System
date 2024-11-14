// import React from 'react';
// import TaskItem from './TaskItem';

// const TaskList = ({ tasks, onToggleStatus, onDelete }) => {
//     return (
//         <div id="task-list">
//             {tasks.map((task) => (
//                 <TaskItem 
//                     key={task.id} 
//                     task={task} 
//                     onToggleStatus={onToggleStatus}
//                     onDelete={onDelete} 
//                 />
//             ))}
//         </div>
//     );
// };

// export default TaskList;
import React from 'react';

const TaskList = ({ tasks, onEdit, onToggleStatus, onDelete }) => {
    return (
        <div id="task-list">
            {tasks.map(task => (
                <div key={task.id} className={`task ${task.status}`}>
                    <div>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Due: {task.dueDate}</p>
                        <p>Priority: {task.priority}</p>
                    </div>
                    <div>
                        <button onClick={() => onToggleStatus(task.id)}>
                            {task.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
                        </button>
                        <button onClick={() => onEdit(task)}>Edit</button>
                        <button onClick={() => onDelete(task.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;

