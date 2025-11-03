import useTaskStore from '../store/taskStore';
import TaskItem from './TaskItem';
import type { Task } from '../types';

function TaskList() {
  // 🔴 PROBLEM: This component needs to do filtering logic itself
  // If multiple components need filtered tasks, you have to duplicate this!
  const tasks = useTaskStore((state) => state.tasks);
  const filters = useTaskStore((state) => state.filters);
  // 🔴 UNCOMMENTED: Watch this spam when you type in search!
  console.log('✅ TaskList re-rendered - using Zustand selectors!');

  // TODO: Implement filtering logic
  // Requirements:
  // 1. Filter by status (all, active, completed)
  // 2. Filter by category (all, work, personal, shopping)
  // 3. Filter by search (check if title or description includes search text)

  const filteredTasks: Task[] = tasks.filter(task => {
    // Status filter
    if (filters.status === 'active' && task.completed) return false;
    if (filters.status === 'completed' && !task.completed) return false;
    
    // Category filter
    if (filters.category !== 'all' && task.category !== filters.category) return false;
    
    // Search filter - check both title and description
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchLower);
      const descriptionMatch = task.description?.toLowerCase().includes(searchLower);
      
      if (!titleMatch && !descriptionMatch) return false;
    }
    
    return true;
  });



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
