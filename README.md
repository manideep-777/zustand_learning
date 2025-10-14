# TaskFlow - Day 0: React Context Version

## 🎯 Mission: Feel the Pain!

Build TaskFlow using **ONLY** React's Context API and useState to understand the problems that Zustand + Immer solve.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

## 📝 Your Implementation Tasks

### Part 1: Task Management (TaskContext.jsx)

Navigate to `src/context/TaskContext.jsx` and implement:

#### ✅ Task 1: `addTask` function
- Add new task to tasks array
- Generate ID with `nanoid()`
- Add `createdAt` timestamp
- Set `completed: false`
- **Feel the pain of spread operators!**

```javascript
const addTask = (task) => {
  setTasks(prevTasks => [
    ...prevTasks,
    {
      ...task,
      id: nanoid(),
      createdAt: Date.now(),
      completed: false
    }
  ]);
};
```

#### ✅ Task 2: `updateTask` function
- Find task by id and merge updates
- **Notice the map + ternary + spread complexity**

```javascript
const updateTask = (id, updates) => {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === id
        ? { ...task, ...updates }
        : task
    )
  );
};
```

#### ✅ Task 3: `deleteTask` function
- Remove task by id using filter

#### ✅ Task 4: `toggleTask` function
- Toggle the completed property
- **More spread operators!**

#### ✅ Task 5: `clearCompleted` function
- Remove all completed tasks

#### ✅ Task 6: Filter functions
- `setStatusFilter(status)` - Update filters.status
- `setCategoryFilter(category)` - Update filters.category
- `setSearchFilter(search)` - Update filters.search
- `resetFilters()` - Reset all to defaults
- **Feel the pain of nested spread operators for simple updates!**

#### ✅ Task 7: localStorage Persistence
- Load tasks from localStorage on mount
- Save tasks to localStorage when they change
- **Notice the manual useEffect boilerplate**

### Part 2: Components

#### ✅ Task 8: TaskCounter.jsx
Calculate:
- `totalTasks` - tasks.length
- `activeTasks` - tasks where completed === false
- `completedTasks` - tasks where completed === true

#### ✅ Task 9: TaskInput.jsx
Implement:
- `handleChange` - Update form data
- `handleSubmit` - Validate and add task

#### ✅ Task 10: TaskList.jsx
Implement filtering logic:
- Filter by status (all/active/completed)
- Filter by category (all/work/personal/shopping)
- Filter by search text
- **Notice you have to write this logic in the component!**

## 🔴 Pain Points to Document

As you build, keep track of these issues:

### 1. Spread Operator Hell
Count how many times you use `...` in TaskContext.jsx
- [ ] I counted ____ spread operators

### 2. Re-render Spam
Open your browser console and interact with the app:
- [ ] I see "🔴 re-rendered" spam everywhere
- [ ] Components re-render even when they shouldn't

### 3. Complex Immutable Updates
- [ ] Nested spreads are hard to read
- [ ] Map + ternary is verbose
- [ ] Simple updates require lots of code

### 4. Manual Persistence
- [ ] Had to write useEffect for loading
- [ ] Had to write useEffect for saving
- [ ] No built-in error handling

### 5. No DevTools
- [ ] Can't see state in Redux DevTools
- [ ] Can't time-travel debug
- [ ] Hard to debug state mutations

### 6. Duplicate Logic
- [ ] Filtering logic has to be in component
- [ ] If another component needs filtered tasks, duplicate code!

### 7. Provider Hell
- [ ] Have to wrap App in TaskProvider
- [ ] For larger apps, would need multiple providers

## 📊 Success Criteria

Your Day 0 is complete when:

- ✅ Can add tasks with all fields
- ✅ Can toggle task completion
- ✅ Can delete tasks
- ✅ All three filters work (status, category, search)
- ✅ Search filters by title/description
- ✅ Tasks persist after page refresh
- ✅ Console shows re-render spam
- ✅ You've documented pain points above

## 💡 Reflection Questions

Before moving to Day 1, answer these:

### 1. Spread Operator Count
**Q:** How many times did you use the spread operator `...`?  
**A:** ____

### 2. Re-render Issues
**Q:** Did components re-render when they shouldn't? Give examples.  
**A:** 

### 3. Code Readability
**Q:** Rate the readability of your immutable update code (1-10):  
**A:** ____

**Q:** Can a beginner easily understand this?  
**A:** 

### 4. Implementation Difficulty
**Q:** What was the most painful part to implement?  
**A:** 

### 5. Maintenance Concerns
**Q:** If you had to add undo/redo, how difficult would it be?  
**A:** 

**Q:** If you had to add a second filter view, would you duplicate the filtering logic?  
**A:** 

## 🎯 Next Steps

Once you've completed Day 0 and documented the pain:

1. **Save this code** - You'll compare it with Day 1
2. **Take screenshots** of the console re-render spam
3. **Count your spread operators** - Write the number here: ____
4. **Move to Day 1** - Experience the relief of Zustand + Immer!

## 🔥 Challenge: Extra Pain

Want to feel even more pain? Try adding:

- [ ] Undo/Redo functionality (manually track history)
- [ ] Sorting tasks by different fields
- [ ] Bulk actions (select multiple tasks)
- [ ] Task categories with nested subcategories

You'll quickly see why we need better tools! 😅

---

**Ready for Day 1?** You've earned it! Time to delete all those spread operators! 🎉
