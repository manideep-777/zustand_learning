import { useTasks } from '../context/TaskContext';

function TaskCounter() {
  // 🔴 PROBLEM: This component re-renders whenever ANY task or filter changes
  // Even though it only needs the tasks array!
  const { tasks } = useTasks();

  // Add console.log to track unnecessary re-renders
  console.log('🔴 TaskCounter re-rendered');

  // TODO: Calculate these values
  // Hint: Use tasks.length and tasks.filter()
  const totalTasks = 0; // YOUR CODE: Count total tasks
  const activeTasks = 0; // YOUR CODE: Count tasks where completed === false
  const completedTasks = 0; // YOUR CODE: Count tasks where completed === true

  return (
    <div className="task-counter">
      <div className="counter-grid">
        <div className="counter-item">
          <div className="count">{totalTasks}</div>
          <div className="label">Total Tasks</div>
        </div>
        <div className="counter-item">
          <div className="count">{activeTasks}</div>
          <div className="label">Active</div>
        </div>
        <div className="counter-item">
          <div className="count">{completedTasks}</div>
          <div className="label">Completed</div>
        </div>
      </div>
    </div>
  );
}

export default TaskCounter;
