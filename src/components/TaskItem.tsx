import useTaskStore from "../store/taskStore";
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  // ✅ FIXED: Using separate selectors for optimal performance
  // Each selector has a stable reference - only re-renders if these functions change (they won't!)
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  // 🔴 UNCOMMENTED: Watch ALL task items re-render when you change ONE!
  console.log(`✅ TaskItem "${task.title}" (id: ${task.id.slice(0, 8)}...) - Zustand selector`);

  // Format date if exists
  const formatDate = (dateString: number | undefined): string | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Format created date
  const formatCreatedDate = (timestamp: number | undefined): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const categoryEmoji: Record<Task['category'], string> = {
    work: '💼',
    personal: '🏠',
    shopping: '🛒'
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <div className="task-header">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <div className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </div>
        <div className="task-badges">
          <span className="badge badge-category">
            {categoryEmoji[task.category]} {task.category}
          </span>
          <span className={`badge badge-priority ${task.priority}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {task.description && (
        <div className="task-description">
          {task.description}
        </div>
      )}

      <div className="task-meta">
        <div className="task-date">
          <span>Created: {formatCreatedDate(task.createdAt)}</span>
          {task.dueDate && (
            <span> • Due: {formatDate(task.dueDate)}</span>
          )}
        </div>
        <div className="task-actions">
          <button
            className="btn-icon btn-delete"
            onClick={() => deleteTask(task.id)}
            title="Delete task"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
