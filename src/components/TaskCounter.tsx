import useTaskStore from "../store/taskStore";

function TaskCounter() {
  // 🔴 PROBLEM: This component re-renders whenever ANY task or filter changes
  // Even though it only needs the tasks array!
  const tasks = useTaskStore((state) => state.tasks);

  // 🔴 UNCOMMENTED: This component re-renders even when filters change!
  console.log('✅ TaskCounter re-rendered - Zustand selector for tasks only!');

  // TODO: Calculate these values
  // Hint: Use tasks.length and tasks.filter()

  // YOUR CODE: Count total tasks
  const totalTasks: number = tasks.length;
  // YOUR CODE: Count tasks where completed === false
  const activeTasks: number = tasks.filter(task => task.completed === false).length;
  // YOUR CODE: Count tasks where completed === true
  const completedTasks: number = tasks.filter(task => task.completed === true).length;

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
