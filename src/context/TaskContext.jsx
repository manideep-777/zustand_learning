import { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  // ==========================================
  // 🔴 STATE SETUP - PROBLEM 1: Multiple useState calls
  // ==========================================
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',      // 'all' | 'active' | 'completed'
    category: 'all',    // 'all' | 'work' | 'personal' | 'shopping'
    search: ''
  });

  // ==========================================
  // 🔴 TASK ACTIONS - PROBLEM 2: Verbose immutable updates
  // ==========================================

  // TODO: Implement addTask function
  // Requirements:
  // 1. Add new task to tasks array
  // 2. Generate unique ID using nanoid()
  // 3. Add createdAt timestamp (Date.now())
  // 4. Set completed to false by default
  // ⚠️ Use spread operator to maintain immutability
  const addTask = (task) => {
    // YOUR CODE HERE
    // Hint: setTasks(prevTasks => [...prevTasks, { ...task, id: nanoid(), ... }])
  };

  // TODO: Implement updateTask function
  // Requirements:
  // 1. Find task by id
  // 2. Merge updates with existing task
  // ⚠️ Use map() + ternary + spread operators (it's painful!)
  const updateTask = (id, updates) => {
    // YOUR CODE HERE
    // Hint: setTasks(prevTasks => prevTasks.map(task => task.id === id ? {...task, ...updates} : task))
  };

  // TODO: Implement deleteTask function
  // Requirements:
  // 1. Remove task from array by id
  // ⚠️ Use filter()
  const deleteTask = (id) => {
    // YOUR CODE HERE
    // Hint: setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  };

  // TODO: Implement toggleTask function
  // Requirements:
  // 1. Toggle the completed property of a task
  // ⚠️ Use map() + ternary + spread (notice the pattern?)
  const toggleTask = (id) => {
    // YOUR CODE HERE
    // Hint: Similar to updateTask but toggle completed property
  };

  // TODO: Implement clearCompleted function
  // Requirements:
  // 1. Remove all completed tasks
  const clearCompleted = () => {
    // YOUR CODE HERE
  };

  // ==========================================
  // 🔴 FILTER ACTIONS - PROBLEM 3: Nested state updates
  // ==========================================

  // TODO: Implement setStatusFilter
  // Requirements:
  // 1. Update filters.status property
  // ⚠️ Must spread the entire filters object to update one property!
  const setStatusFilter = (status) => {
    // YOUR CODE HERE
    // Hint: setFilters(prevFilters => ({ ...prevFilters, status: status }))
  };

  // TODO: Implement setCategoryFilter
  // Requirements:
  // 1. Update filters.category property
  const setCategoryFilter = (category) => {
    // YOUR CODE HERE
  };

  // TODO: Implement setSearchFilter
  // Requirements:
  // 1. Update filters.search property
  const setSearchFilter = (search) => {
    // YOUR CODE HERE
  };

  // TODO: Implement resetFilters
  // Requirements:
  // 1. Reset all filters to default values
  const resetFilters = () => {
    // YOUR CODE HERE
  };

  // ==========================================
  // 🔴 PERSISTENCE - PROBLEM 4 & 5: Manual localStorage sync
  // ==========================================

  // TODO: Load tasks from localStorage on mount
  // Requirements:
  // 1. Get 'taskflow-tasks' from localStorage
  // 2. Parse JSON and set to tasks state
  // 3. Handle errors gracefully
  // ⚠️ Runs only once on mount
  useEffect(() => {
    // YOUR CODE HERE
    // Hint: localStorage.getItem(), JSON.parse(), try-catch
  }, []); // Empty dependency array = run once

  // TODO: Save tasks to localStorage whenever tasks change
  // Requirements:
  // 1. Stringify tasks and save to localStorage
  // ⚠️ PROBLEM: This runs on EVERY render when tasks change!
  useEffect(() => {
    // YOUR CODE HERE
    // Hint: localStorage.setItem('taskflow-tasks', JSON.stringify(tasks))
  }, [tasks]); // Runs whenever tasks array changes

  // ==========================================
  // 🔴 PROBLEM 6: ALL consumers re-render when ANY value changes!
  // ==========================================
  // When ANY task or filter changes, EVERY component using this context re-renders
  // Even if they only need one specific value!
  
  const value = {
    // State
    tasks,
    filters,
    
    // Task actions
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    
    // Filter actions
    setStatusFilter,
    setCategoryFilter,
    setSearchFilter,
    resetFilters,
  };

  // 🔴 Add console.log to see re-render spam
  console.log('🔴 TaskProvider re-rendered');

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Custom hook to use the context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};
