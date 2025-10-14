import { useTasks } from '../context/TaskContext';

function TaskCounter() {
  // 🔴 PROBLEM: This component re-renders whenever ANY task or filter changes
  // Even though it only needs the tasks array!
  const { tasks } = useTasks();

  // 🔴 UNCOMMENTED: This component re-renders even when filters change!
  console.log('🔴 TaskCounter re-rendered - only needs tasks array but re-renders for EVERYTHING!');

  // TODO: Calculate these values
  // Hint: Use tasks.length and tasks.filter()

  // YOUR CODE: Count total tasks
  const totalTasks = tasks.length; 
  // YOUR CODE: Count tasks where completed === false
  const activeTasks = tasks.filter(task => task.completed===false).length; 
  // YOUR CODE: Count tasks where completed === true
  const completedTasks = tasks.filter(task => task.completed === true).length; 

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
