// ==========================================
// 🎯 DAY 1: YOUR ZUSTAND STORE - CODE IT YOURSELF!
// ==========================================
// This is YOUR practice file. Follow the TODO comments to build your store.
// Compare each step with TaskContext.jsx to see the improvements!

import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { immer } from 'zustand/middleware/immer';

// ==========================================
// 📝 STEP 1: Create basic store (WITHOUT Immer)
// ==========================================
// TODO: Use create() from Zustand to create your store
// Syntax: const useTaskStore = create((set, get) => ({ ... }))
//
// Inside the store object, you need:
// 1. State: tasks array and filters object
// 2. Actions: All the functions from TaskContext.jsx
//
// ⚠️ IMPORTANT: Still use spread operators for now!
// We'll add Immer in STEP 2 to remove them.

// YOUR CODE HERE - Create the store

// const useTaskStore = create((set, get) => ({
//     tasks: [],
//     filters: {
//         status: 'all',      // 'all' | 'active' | 'completed'
//         category: 'all',    // 'all' | 'work' | 'personal' | 'shopping'
//         search: ''
//     },

//     addTask: (task) => set((state) => ({
//       tasks: [ ...state.tasks, { ...task, id: nanoid(), createdAt: Date.now(), completed: false } ],
//     })),

//     updateTask: (id, updates) => set((state) => ({
//         tasks: state.tasks.map(task => task.id === id ? { ...task, ...updates } : task)
//     })),

//     deleteTask: (id) => set((state) => ({
//         tasks: state.tasks.filter(task => task.id !== id)
//     })),

//     toggleTask: (id) => set((state) => ({
//         tasks: state.tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
//     })),

//     clearCompleted: () => set((state) => ({
//         tasks: state.tasks.filter(task => task.completed === false)
//     })),

//     setStatusFilter: (status) => set((state) => ({
//         filters: { ...state.filters, status: status }
//     })),

//     setCategoryFilter: (category) => set((state) => ({
//         filters: { ...state.filters, category: category }
//     })),

//     setSearchFilter: (search) => set((state) => ({
//         filters: { ...state.filters, search: search }
//     })),

//     resetFilters: () => set((state) => ({
//         filters: { status: 'all', category: 'all', search: '' }
//     }))

// }));


// ==========================================
// 📝 STEP 2: Add Immer middleware (After STEP 1 works)
// ==========================================
// TODO: Import immer middleware
// import { immer } from 'zustand/middleware/immer';
//
// TODO: Wrap your store with immer()
// Example: create(immer((set, get) => ({ ... })))
//
// TODO: Replace ALL spread operators with direct mutations:
// ❌ BEFORE: tasks: [...state.tasks, newTask]
// ✅ AFTER:  state.tasks.push(newTask)
//
// ❌ BEFORE: tasks: state.tasks.map(t => t.id === id ? {...t, ...updates} : t)
// ✅ AFTER:  const task = state.tasks.find(t => t.id === id); 
//           Object.assign(task, updates);


// ==========================================
// 💡 HINTS FOR EACH ACTION:
// ==========================================

// addTask(task):
// - Find the addTask function in TaskContext.jsx
// - Copy the logic but adapt to Zustand syntax
// - Without Immer: set((state) => ({ tasks: [...state.tasks, {...task, id, timestamp}] }))
// - With Immer: set((state) => { state.tasks.push({...task, id, timestamp}) })

// updateTask(id, updates):
// - Currently uses: prevTasks.map(task => task.id === id ? {...task, ...updates} : task)
// - Without Immer: Same map + ternary
// - With Immer: const task = state.tasks.find(...); Object.assign(task, updates);

// deleteTask(id):
// - Currently uses: prevTasks.filter(task => task.id !== id)
// - Without Immer: Same filter
// - With Immer: const index = state.tasks.findIndex(...); state.tasks.splice(index, 1);

// toggleTask(id):
// - Currently uses: map + toggle completed
// - Without Immer: Same map + ternary
// - With Immer: const task = state.tasks.find(...); task.completed = !task.completed;

// clearCompleted():
// - Currently uses: filter(task => !task.completed)
// - Without Immer: Same filter
// - With Immer: state.tasks = state.tasks.filter(t => !t.completed);

// setStatusFilter(status):
// - Currently uses: { ...prevFilters, status }
// - Without Immer: set((state) => ({ filters: { ...state.filters, status } }))
// - With Immer: state.filters.status = status;

// (Same pattern for setCategoryFilter, setSearchFilter)

// resetFilters():
// - Currently uses: setFilters({ status: 'all', category: 'all', search: '' })
// - Without Immer: set({ filters: { status: 'all', ... } })
// - With Immer: state.filters = { status: 'all', ... };



const useTaskStore = create(
    immer((set, get) => ({
        tasks: [],
        filters: {
            status: 'all',      // 'all' | 'active' | 'completed'
            category: 'all',    // 'all' | 'work' | 'personal' | 'shopping'
            search: ''
        },

        addTask: (task) => set((state) => {
            state.tasks.push({ ...task, id: nanoid(), createdAt: Date.now(), completed: false });
        }),

        updateTask: (id, updates) => set((state) => {
            const task = state.tasks.find(t => t.id === id);
            Object.assign(task, updates);
        }),

        deleteTask: (id) => set((state) => {
            const index = state.tasks.findIndex(t => t.id === id);
            state.tasks.splice(index, 1);
        }),

        toggleTask: (id) => set((state) => {
            const task = state.tasks.find(t => t.id === id);
            task.completed = !task.completed;
        }),

        clearCompleted: () => set((state) => {
            state.tasks = state.tasks.filter(task => task.completed === false);
        }),

        setStatusFilter: (status) => set((state) => {
            state.filters.status = status;
        }),

        setCategoryFilter: (category) => set((state) => {
            state.filters.category = category;
        }),

        setSearchFilter: (search) => set((state) => {
            state.filters.search = search;
        }),

        resetFilters: () => set((state) => {
            state.filters = { status: 'all', category: 'all', search: '' };
        })

    }))
);



// ==========================================
// 🎓 LEARNING CHECKLIST - Mark as you complete:
// ==========================================
// [ ] Created store with create()
// [ ] Added tasks array state
// [ ] Added filters object state
// [ ] Implemented addTask (with spread operators)
// [ ] Implemented updateTask (with map + ternary)
// [ ] Implemented deleteTask (with filter)
// [ ] Implemented toggleTask (with map)
// [ ] Implemented clearCompleted (with filter)
// [ ] Implemented all filter functions (with spread)
// [ ] Added immer() wrapper
// [ ] Replaced addTask spread with push()
// [ ] Replaced updateTask map with find() + Object.assign()
// [ ] Replaced deleteTask filter with findIndex() + splice()
// [ ] Replaced toggleTask map with direct mutation
// [ ] Replaced filter spreads with direct property assignment
// [ ] Tested that everything works!


// ==========================================
// 📚 REFERENCE: Context vs Zustand Comparison
// ==========================================

// CONTEXT API (Day 0):
// ❌ const addTask = (task) => {
//      setTasks(prevTasks => [...prevTasks, {...task, id: nanoid()}])
//    }

// ZUSTAND WITHOUT IMMER (Day 1 Step 1):
// ⚠️ addTask: (task) => set((state) => ({
//      tasks: [...state.tasks, {...task, id: nanoid()}]
//    }))

// ZUSTAND WITH IMMER (Day 1 Step 2):
// ✅ addTask: (task) => set((state) => {
//      state.tasks.push({...task, id: nanoid()})
//    })


export default useTaskStore;

// ==========================================
// 🧪 TEMPORARY: Expose to browser console for testing
// ==========================================
// Remove this after you finish testing!
if (typeof window !== 'undefined') {
    window.useTaskStore = useTaskStore;
}

// ==========================================
// 🚀 NEXT STEPS AFTER YOU FINISH THIS FILE:
// ==========================================
// 1. Test the store in browser console: useTaskStore.getState()
// 2. Update components to use useTaskStore instead of useTasks
// 3. Remove TaskContext.jsx and Provider from App.jsx
// 4. Celebrate the simplicity! 🎉
