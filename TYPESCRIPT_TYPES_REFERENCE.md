# 📚 TypeScript Types Reference - Zustand + React Patterns

## 🎯 Overview

Complete reference for TypeScript patterns in Zustand stores and React components.

---

## 📦 **Core Type Definitions**

### **Task Model Types**

```typescript
// Basic types
export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'shopping';
export type FilterStatus = 'all' | 'active' | 'completed';
export type FilterCategory = 'all' | Category;

// Main task interface
export interface Task {
  id: string;
  title: string;
  description?: string;          // Optional field
  completed: boolean;
  category: Category;
  priority: Priority;
  createdAt: number;
  dueDate?: number;              // Optional field
}

// Filter state
export interface FilterState {
  status: FilterStatus;
  category: FilterCategory;
  search: string;
}
```

---

## 🔧 **TypeScript Utility Types**

### **1. Omit<Type, Keys>**
Remove specific properties from a type.

```typescript
// Remove auto-generated fields when creating task
export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'completed'>;

// Result:
interface TaskInput {
  title: string;
  description?: string;
  category: Category;
  priority: Priority;
  dueDate?: number;
}

// Usage:
const newTask: TaskInput = {
  title: 'Buy milk',
  category: 'shopping',
  priority: 'high'
  // ✅ No need for id, createdAt, completed
};
```

---

### **2. Partial<Type>**
Make all properties optional.

```typescript
// For updating tasks (all fields optional)
export type TaskUpdate = Partial<Omit<Task, 'id' | 'createdAt'>>;

// Result:
interface TaskUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
  category?: Category;
  priority?: Priority;
  dueDate?: number;
}

// Usage:
updateTask('abc123', { completed: true }); // Only update one field
updateTask('def456', { title: 'New title', priority: 'low' }); // Update multiple
```

---

### **3. Pick<Type, Keys>**
Select specific properties from a type.

```typescript
// Extract only ID and title
export type TaskSummary = Pick<Task, 'id' | 'title' | 'completed'>;

// Result:
interface TaskSummary {
  id: string;
  title: string;
  completed: boolean;
}

// Usage:
const summaries: TaskSummary[] = tasks.map(t => ({
  id: t.id,
  title: t.title,
  completed: t.completed
}));
```

---

### **4. Record<Keys, Type>**
Create object type with specific keys.

```typescript
// Emoji mapping for categories
const categoryEmoji: Record<Category, string> = {
  work: '💼',
  personal: '🏠',
  shopping: '🛒'
};

// Priority colors
const priorityColor: Record<Priority, string> = {
  low: '#4CAF50',
  medium: '#FF9800',
  high: '#F44336'
};
```

---

### **5. Extract Type from Object**

```typescript
// Extract union type from interface property
type TaskCategory = Task['category']; // 'work' | 'personal' | 'shopping'
type TaskPriority = Task['priority']; // 'low' | 'medium' | 'high'

// Extract array element type
type TaskArray = Task[];
type SingleTask = TaskArray[number]; // Task
```

---

## 🏪 **Zustand Store Typing**

### **Basic Store Interface**

```typescript
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<CounterStore>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));
```

---

### **Store with Middleware (NO Extra Parentheses)**

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// ❌ WRONG - Don't do this with single middleware:
const useStore = create<StoreType>()(
  immer((set) => ({ ... }))
);

// ✅ CORRECT - Single middleware doesn't need extra ():
const useStore = create<StoreType>(
  immer((set) => ({ ... }))
);
```

---

### **Store with Multiple Middleware (Need Extra Parentheses)**

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface TaskStore {
  tasks: Task[];
  addTask: (task: TaskInput) => void;
}

// ✅ CORRECT - Multiple middleware need extra ():
const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      immer((set) => ({
        tasks: [],
        addTask: (task) => set((state) => {
          state.tasks.push({ ...task, id: nanoid() });
        })
      })),
      { name: 'storage' }
    ),
    { name: 'DevTools' }
  )
);
```

**Rule:** Extra `()()` needed when using 2+ middleware!

---

### **Typed Set Function**

```typescript
interface Store {
  count: number;
  increment: () => void;
}

const useStore = create<Store>()((set, get) => ({
  count: 0,
  
  // set is typed automatically
  increment: () => set(
    (state) => ({ count: state.count + 1 }), // state is typed as Store
    false, // replace flag
    'increment' // action name
  )
}));
```

---

### **Typed Get Function**

```typescript
interface Store {
  count: number;
  doubleCount: () => number;
}

const useStore = create<Store>()((set, get) => ({
  count: 5,
  
  // get returns typed store state
  doubleCount: () => {
    const currentCount = get().count; // typed as number
    return currentCount * 2;
  }
}));
```

---

## 🧩 **React Component Typing**

### **Component Props**

```typescript
import type { Task } from '../types';

// Option 1: Interface
interface TaskItemProps {
  task: Task;
  onToggle?: (id: string) => void; // Optional callback
}

// Option 2: Type alias
type TaskItemProps = {
  task: Task;
  onToggle?: (id: string) => void;
};

// Usage:
function TaskItem({ task, onToggle }: TaskItemProps) {
  // task is typed as Task
  return <div>{task.title}</div>;
}

// Or with destructuring default:
function TaskItem({ task, onToggle = () => {} }: TaskItemProps) {
  // onToggle has default value
}
```

---

### **Children Props**

```typescript
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode; // Accepts any valid React child
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return <div className={className}>{children}</div>;
}
```

---

### **Event Handlers**

```typescript
import { ChangeEvent, FormEvent, MouseEvent } from 'react';

function MyComponent() {
  // Input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  // Form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  // Button click
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked');
  };
  
  // Generic change (input, select, textarea)
  const handleGenericChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <select onChange={handleGenericChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
```

---

### **useState Typing**

```typescript
import { useState } from 'react';

// Type inference (TypeScript infers type from initial value)
const [count, setCount] = useState(0); // count: number
const [name, setName] = useState(''); // name: string
const [isOpen, setIsOpen] = useState(false); // isOpen: boolean

// Explicit typing (when initial value is null or complex)
const [user, setUser] = useState<User | null>(null);
const [tasks, setTasks] = useState<Task[]>([]);

// Object state
interface FormData {
  title: string;
  category: Category;
}

const [formData, setFormData] = useState<FormData>({
  title: '',
  category: 'work'
});
```

---

### **useRef Typing**

```typescript
import { useRef } from 'react';

function MyComponent() {
  // DOM element ref
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Value ref
  const countRef = useRef<number>(0);
  
  const focusInput = () => {
    inputRef.current?.focus(); // ?. handles null case
  };
  
  return <input ref={inputRef} />;
}
```

---

## 🎣 **Zustand Selector Typing**

### **Basic Selector**

```typescript
import useTaskStore from './store/taskStore';

function MyComponent() {
  // Type inferred from store
  const tasks = useTaskStore((state) => state.tasks); // Task[]
  const addTask = useTaskStore((state) => state.addTask); // (task: TaskInput) => void
}
```

---

### **Computed Selector**

```typescript
function MyComponent() {
  // TypeScript infers return type
  const activeTasks = useTaskStore((state) => 
    state.tasks.filter(t => !t.completed)
  ); // Task[]
  
  const taskCount = useTaskStore((state) => 
    state.tasks.length
  ); // number
}
```

---

### **Multiple Values (Object)**

```typescript
// ❌ AVOID - Creates new object every render
const { tasks, filters } = useTaskStore((state) => ({
  tasks: state.tasks,
  filters: state.filters
}));

// ✅ BETTER - Separate selectors
const tasks = useTaskStore((state) => state.tasks);
const filters = useTaskStore((state) => state.filters);
```

---

### **Custom Equality Function**

```typescript
import { shallow } from 'zustand/shallow';

function MyComponent() {
  // Only re-render if array contents change (shallow comparison)
  const taskIds = useTaskStore(
    (state) => state.tasks.map(t => t.id),
    shallow
  );
}
```

---

## 🔧 **Advanced Patterns**

### **Async Actions with Loading States**

```typescript
interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  
  fetchTasks: () => Promise<void>;
}

const useTaskStore = create<TaskStore>()(
  immer((set) => ({
    tasks: [],
    loading: false,
    error: null,
    
    fetchTasks: async () => {
      set((state) => {
        state.loading = true;
        state.error = null;
      });
      
      try {
        const response = await fetch('/api/tasks');
        const data: Task[] = await response.json();
        
        set((state) => {
          state.tasks = data;
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'Unknown error';
          state.loading = false;
        });
      }
    }
  }))
);
```

---

### **Computed Selectors (Memoized)**

```typescript
interface TaskStore {
  tasks: Task[];
  filters: FilterState;
  
  // Computed getter
  getFilteredTasks: () => Task[];
}

const useTaskStore = create<TaskStore>()(
  immer((set, get) => ({
    tasks: [],
    filters: { status: 'all', category: 'all', search: '' },
    
    getFilteredTasks: () => {
      const { tasks, filters } = get();
      
      return tasks.filter(task => {
        if (filters.status === 'active' && task.completed) return false;
        if (filters.status === 'completed' && !task.completed) return false;
        if (filters.category !== 'all' && task.category !== filters.category) return false;
        
        return true;
      });
    }
  }))
);

// Usage:
const filteredTasks = useTaskStore((state) => state.getFilteredTasks());
```

---

### **Store Slices Pattern**

```typescript
// Split store into logical slices

interface TaskSlice {
  tasks: Task[];
  addTask: (task: TaskInput) => void;
  deleteTask: (id: string) => void;
}

interface FilterSlice {
  filters: FilterState;
  setStatusFilter: (status: FilterStatus) => void;
}

type Store = TaskSlice & FilterSlice;

const createTaskSlice = (set: any): TaskSlice => ({
  tasks: [],
  addTask: (task) => set((state: Store) => {
    state.tasks.push({ ...task, id: nanoid() });
  }),
  deleteTask: (id) => set((state: Store) => {
    const index = state.tasks.findIndex(t => t.id === id);
    state.tasks.splice(index, 1);
  })
});

const createFilterSlice = (set: any): FilterSlice => ({
  filters: { status: 'all', category: 'all', search: '' },
  setStatusFilter: (status) => set((state: Store) => {
    state.filters.status = status;
  })
});

const useStore = create<Store>()(
  immer((set) => ({
    ...createTaskSlice(set),
    ...createFilterSlice(set)
  }))
);
```

---

## 🎯 **Common TypeScript Patterns**

### **Conditional Types**

```typescript
// Type changes based on condition
type TaskStatus<T extends boolean> = T extends true ? 'completed' : 'active';

const status1: TaskStatus<true> = 'completed'; // ✅
const status2: TaskStatus<false> = 'active'; // ✅
```

---

### **Union Discrimination**

```typescript
type Success = { status: 'success'; data: Task[] };
type Loading = { status: 'loading' };
type Error = { status: 'error'; message: string };

type AsyncState = Success | Loading | Error;

function handleState(state: AsyncState) {
  // TypeScript knows which properties exist based on status
  if (state.status === 'success') {
    console.log(state.data); // ✅ data exists
  } else if (state.status === 'error') {
    console.log(state.message); // ✅ message exists
  }
}
```

---

### **Generic Components**

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

// Usage:
<List<Task>
  items={tasks}
  renderItem={(task) => <div>{task.title}</div>}
/>
```

---

## ✅ **Type Checking Tips**

### **Non-null Assertion**

```typescript
// When you KNOW value exists
const element = document.getElementById('root')!; // Tell TS it's not null

// Optional chaining (safer)
const value = element?.value; // Returns undefined if element is null
```

---

### **Type Guards**

```typescript
function isTask(obj: any): obj is Task {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.completed === 'boolean'
  );
}

// Usage:
if (isTask(data)) {
  console.log(data.title); // TypeScript knows it's a Task
}
```

---

### **Const Assertions**

```typescript
// Without const assertion
const colors = ['red', 'blue']; // string[]

// With const assertion
const colors = ['red', 'blue'] as const; // readonly ['red', 'blue']
type Color = typeof colors[number]; // 'red' | 'blue'
```

---

## 📚 **Quick Reference**

| Pattern | Syntax | Use Case |
|---------|--------|----------|
| **Omit** | `Omit<T, 'key'>` | Remove properties |
| **Partial** | `Partial<T>` | Make all optional |
| **Pick** | `Pick<T, 'key'>` | Select properties |
| **Record** | `Record<K, V>` | Object with specific keys |
| **Union** | `'a' \| 'b' \| 'c'` | One of multiple values |
| **Optional** | `prop?: type` | May be undefined |
| **Array** | `T[]` or `Array<T>` | Array of type T |
| **Function** | `(arg: T) => R` | Function signature |
| **Promise** | `Promise<T>` | Async return type |
| **Generic** | `<T>` | Reusable type parameter |

---

## 🎓 **Best Practices**

1. **Use `interface` for objects, `type` for unions/primitives**
2. **Prefer type inference over explicit types**
3. **Use `const` assertions for readonly values**
4. **Add `// @ts-expect-error` with comment when intentionally ignoring**
5. **Use strict mode in tsconfig.json**
6. **Avoid `any` - use `unknown` if type is truly unknown**
7. **Use optional chaining `?.` for safe property access**

---

**You now have a complete TypeScript reference!** 🚀

Refer to this guide whenever you need to type stores, components, or utilities!
