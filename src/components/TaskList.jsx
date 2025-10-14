import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  // 🔴 PROBLEM: This component needs to do filtering logic itself
  // If multiple components need filtered tasks, you have to duplicate this!
  const { tasks, filters } = useTasks();

  console.log('🔴 TaskList re-rendered');

  // TODO: Implement filtering logic
  // Requirements:
  // 1. Filter by status (all, active, completed)
  // 2. Filter by category (all, work, personal, shopping)
  // 3. Filter by search (check if title or description includes search text)
  // Hint: Chain multiple .filter() calls or use one with multiple conditions
  
  const filteredTasks = tasks; // REPLACE THIS with your filtering logic
  
  // YOUR CODE HERE
  // Example structure:
  // const filteredTasks = tasks.filter(task => {
  //   // Status filter
  //   if (filters.status === 'active' && task.completed) return false;
  //   if (filters.status === 'completed' && !task.completed) return false;
  //   
  //   // Category filter
  //   // ...
  //   
  //   // Search filter
  //   // ...
  //   
  //   return true;
  // });

  return (
    <div className="task-list-container">
      <h2>📋 Tasks ({filteredTasks.length})</h2>
      
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>No tasks found</h3>
          <p>
            {tasks.length === 0 
              ? "Add your first task to get started!" 
              : "Try adjusting your filters"}
          </p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
