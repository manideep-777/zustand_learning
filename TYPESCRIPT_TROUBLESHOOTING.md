# 🐛 TypeScript Troubleshooting Guide

## 🎯 Common TypeScript Errors & Solutions

This guide covers the most common TypeScript errors you'll encounter when migrating TaskFlow to TypeScript.

---

## ❌ Error 1: `Property 'xxx' does not exist on type 'never'`

### **Error Message:**
```
Property 'push' does not exist on type 'never'
```

### **Cause:**
TypeScript can't infer the type of the array/object in Immer's draft state.

### **Example:**
```typescript
// ❌ WRONG:
const useStore = create(immer((set) => ({
  tasks: [],
  addTask: (task) => set((state) => {
    state.tasks.push(task); // Error: 'push' does not exist on type 'never'
  })
})));
```

### **Solution:**
Add generic type to `create()`:

```typescript
// ✅ CORRECT:
interface TaskStore {
  tasks: Task[];
  addTask: (task: TaskInput) => void;
}

const useStore = create<TaskStore>()(
  immer((set) => ({
    tasks: [],
    addTask: (task) => set((state) => {
      state.tasks.push(task); // ✅ Works!
    })
  }))
);
```

---

## ❌ Error 2: `Type 'xxx' is not assignable to type 'never'`

### **Error Message:**
```
Type 'string' is not assignable to type 'never'
```

### **Cause:**
Missing interface definition or type annotation.

### **Example:**
```typescript
// ❌ WRONG:
const useStore = create((set) => ({
  tasks: [], // TypeScript infers: never[]
  filters: {} // TypeScript infers: {}
}));
```

### **Solution:**
Define interface and add type to `create()`:

```typescript
// ✅ CORRECT:
interface TaskStore {
  tasks: Task[];
  filters: FilterState;
}

const useStore = create<TaskStore>()((set) => ({
  tasks: [],
  filters: { status: 'all', category: 'all', search: '' }
}));
```

---

## ❌ Error 3: Middleware Type Errors

### **Error Message:**
```
Argument of type 'xxx' is not assignable to parameter of type 'StateCreator'
```

### **Cause:**
Missing extra parentheses `()` when using multiple middleware.

### **Example:**
```typescript
// ❌ WRONG:
const useStore = create<TaskStore>(
  devtools(persist(immer(...))) // Missing extra ()
);
```

### **Solution:**
Add extra `()()` when using 2+ middleware:

```typescript
// ✅ CORRECT:
const useStore = create<TaskStore>()(  // ← Extra ()
  devtools(
    persist(
      immer((set) => ({ ... }))
    )
  )
);
```

**Rule:** Single middleware: `create<T>(middleware(...))`  
**Rule:** Multiple middleware: `create<T>()(middleware(...))`

---

## ❌ Error 4: `Cannot find module './xxx' or its corresponding type declarations`

### **Error Message:**
```
Cannot find module './store/taskStore' or its corresponding type declarations
```

### **Cause:**
Importing `.js` file with `.ts` extension, or file not renamed yet.

### **Example:**
```typescript
// ❌ WRONG:
import useTaskStore from './store/taskStore.js'; // Looking for .js
import useTaskStore from './store/taskStore'; // File still .js
```

### **Solution:**
1. Rename file from `.js` to `.ts`
2. Import without extension:

```typescript
// ✅ CORRECT:
import useTaskStore from './store/taskStore'; // TypeScript adds .ts/.tsx
```

---

## ❌ Error 5: `Object is possibly 'null'` or `'undefined'`

### **Error Message:**
```
Object is possibly 'null'
```

### **Cause:**
Accessing property that might be null/undefined.

### **Example:**
```typescript
// ❌ WRONG:
const task = tasks.find(t => t.id === id);
task.completed = true; // Error: task might be undefined
```

### **Solution:**
Add null check or optional chaining:

```typescript
// ✅ Option 1: If statement
const task = tasks.find(t => t.id === id);
if (task) {
  task.completed = true;
}

// ✅ Option 2: Optional chaining
const task = tasks.find(t => t.id === id);
task?.completed = true; // Only runs if task exists

// ✅ Option 3: Non-null assertion (if you're SURE it exists)
const task = tasks.find(t => t.id === id)!;
task.completed = true; // ! tells TS it's not null
```

---

## ❌ Error 6: `Parameter 'xxx' implicitly has an 'any' type`

### **Error Message:**
```
Parameter 'task' implicitly has an 'any' type
```

### **Cause:**
Function parameter not typed.

### **Example:**
```typescript
// ❌ WRONG:
const addTask = (task) => { // 'task' has implicit any
  state.tasks.push(task);
};
```

### **Solution:**
Add type annotation:

```typescript
// ✅ CORRECT:
interface TaskStore {
  addTask: (task: TaskInput) => void; // Type in interface
}

// Or inline:
const addTask = (task: TaskInput) => {
  state.tasks.push(task);
};
```

---

## ❌ Error 7: Event Handler Type Errors

### **Error Message:**
```
Type 'ChangeEvent<HTMLInputElement>' is not assignable to type 'ChangeEvent<HTMLTextAreaElement>'
```

### **Cause:**
Handler typed for one element, but used with multiple.

### **Example:**
```typescript
// ❌ WRONG:
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

<input onChange={handleChange} /> ✅
<textarea onChange={handleChange} /> ❌ Error!
```

### **Solution:**
Use union type for multiple elements:

```typescript
// ✅ CORRECT:
const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  console.log(e.target.value);
};

<input onChange={handleChange} /> ✅
<textarea onChange={handleChange} /> ✅
<select onChange={handleChange} /> ✅
```

---

## ❌ Error 8: `useState` Type Inference Issues

### **Error Message:**
```
Type 'null' is not assignable to type 'User'
```

### **Cause:**
TypeScript infers `null` as the only type from initial value.

### **Example:**
```typescript
// ❌ WRONG:
const [user, setUser] = useState(null); // Type: null
setUser({ id: '1', name: 'John' }); // ❌ Error!
```

### **Solution:**
Add explicit type with union:

```typescript
// ✅ CORRECT:
const [user, setUser] = useState<User | null>(null); // Type: User | null
setUser({ id: '1', name: 'John' }); // ✅ Works!
```

---

## ❌ Error 9: `Type 'string' is not assignable to type 'Category'`

### **Error Message:**
```
Type 'string' is not assignable to type 'Category'
```

### **Cause:**
String literal not matching union type.

### **Example:**
```typescript
type Category = 'work' | 'personal' | 'shopping';

// ❌ WRONG:
const category: Category = 'Work'; // Capital W
```

### **Solution:**
Use exact string from union:

```typescript
// ✅ CORRECT:
const category: Category = 'work'; // Lowercase

// Or type assertion if coming from external source:
const category = userInput as Category;

// Or with validation:
const isCategory = (val: string): val is Category => {
  return ['work', 'personal', 'shopping'].includes(val);
};

if (isCategory(userInput)) {
  const category: Category = userInput; // ✅ Safe!
}
```

---

## ❌ Error 10: `Property 'xxx' does not exist on type 'Window & typeof globalThis'`

### **Error Message:**
```
Property 'useTaskStore' does not exist on type 'Window & typeof globalThis'
```

### **Cause:**
Adding store to window for debugging without type declaration.

### **Example:**
```typescript
// ❌ WRONG:
window.useTaskStore = useTaskStore; // Error!
```

### **Solution:**
Extend Window interface:

```typescript
// ✅ CORRECT:
// In src/types/window.d.ts:
import type { useTaskStore } from '../store/taskStore';

declare global {
  interface Window {
    useTaskStore: typeof useTaskStore;
  }
}

// In your store file:
if (import.meta.env.DEV) {
  window.useTaskStore = useTaskStore; // ✅ Works!
}
```

---

## ❌ Error 11: `Cannot redeclare block-scoped variable 'xxx'`

### **Error Message:**
```
Cannot redeclare block-scoped variable 'Task'
```

### **Cause:**
Two files have same type name, both files included in same scope.

### **Solution:**
Use `export` to make file a module:

```typescript
// ✅ CORRECT:
// In types/index.ts:
export interface Task {
  id: string;
  // ...
}

// This makes file a module, preventing global scope pollution
```

---

## ❌ Error 12: Circular Dependency Issues

### **Error Message:**
```
Module '"./store/taskStore"' has no exported member 'TaskStore'
```

### **Cause:**
Circular import between store and types.

### **Solution:**
Move types to separate file:

```typescript
// ✅ CORRECT structure:
src/
  types/
    index.ts         // All type definitions
  store/
    taskStore.ts     // Imports from ../types
  components/
    TaskItem.tsx     // Imports from ../types and ../store
```

---

## ❌ Error 13: `Argument of type 'Task' is not assignable to parameter of type 'TaskInput'`

### **Error Message:**
```
Argument of type 'Task' is not assignable to parameter of type 'TaskInput'
```

### **Cause:**
Passing full `Task` object when function expects `TaskInput` (without id, createdAt).

### **Example:**
```typescript
// ❌ WRONG:
const existingTask: Task = { id: '1', title: 'Test', /* ... */ };
addTask(existingTask); // Error: has extra properties
```

### **Solution:**
Extract only needed properties:

```typescript
// ✅ CORRECT:
const existingTask: Task = { id: '1', title: 'Test', /* ... */ };

// Option 1: Destructure needed props
const { title, description, category, priority, dueDate } = existingTask;
addTask({ title, description, category, priority, dueDate });

// Option 2: Type assertion (if you're sure)
addTask(existingTask as TaskInput);

// Option 3: Omit helper
const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};

addTask(omit(existingTask, ['id', 'createdAt', 'completed']));
```

---

## 🔧 **Quick Fixes**

### **Fix 1: Reset TypeScript Server in VS Code**

If types aren't updating:
1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "TypeScript: Restart TS Server"
3. Press Enter

---

### **Fix 2: Clear TypeScript Cache**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear TypeScript build info
rm -rf dist/ .tsbuildinfo
```

---

### **Fix 3: Check TypeScript Version**

```bash
# Check local TypeScript version
npx tsc --version

# Update TypeScript
npm install -D typescript@latest
```

---

### **Fix 4: Verify tsconfig.json**

Make sure your `tsconfig.json` has these settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

## 🎯 **Debugging Strategy**

When you encounter a TypeScript error:

1. **Read the error message carefully**
   - What type is expected?
   - What type is provided?

2. **Check the line number**
   - Is it the exact line, or where type is used?

3. **Hover over variables**
   - See what type TypeScript inferred
   - Compare with expected type

4. **Use `console.log()` with types**
   ```typescript
   const task = tasks[0];
   console.log('Task type:', typeof task); // Runtime
   // Hover over 'task' to see compile-time type
   ```

5. **Simplify the error**
   - Remove middleware temporarily
   - Test with minimal example
   - Add types one at a time

6. **Use type assertions temporarily**
   ```typescript
   // To test if type is the issue:
   const value = unknownValue as any; // Bypass type check
   // If it works, the type was wrong
   ```

---

## 🚨 **When to Use Type Assertions**

Type assertions (`as Type`) should be used sparingly:

### **✅ Good Use Cases:**

1. **You know more than TypeScript:**
   ```typescript
   const element = document.getElementById('root') as HTMLDivElement;
   ```

2. **Working with external APIs:**
   ```typescript
   const data = await response.json() as Task[];
   ```

3. **Const assertions:**
   ```typescript
   const config = { readonly: true } as const;
   ```

### **❌ Bad Use Cases:**

1. **Hiding real type errors:**
   ```typescript
   // ❌ Don't do this!
   const task = wrongType as Task; // Hides the real problem
   ```

2. **Working around missing types:**
   ```typescript
   // ❌ Don't do this!
   const value = obj as any; // Defeats purpose of TypeScript
   ```

---

## 📚 **Additional Resources**

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Zustand TypeScript Guide](https://docs.pmnd.rs/zustand/guides/typescript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

## ✅ **Troubleshooting Checklist**

When encountering errors:

- [ ] Is `tsconfig.json` configured correctly?
- [ ] Are all files renamed from `.js`/`.jsx` to `.ts`/`.tsx`?
- [ ] Is store interface defined before `create()`?
- [ ] Are middleware wrapped with correct parentheses?
- [ ] Are all imports using correct extensions?
- [ ] Is TypeScript version up to date?
- [ ] Did you restart TS server in VS Code?
- [ ] Are all `any` types removed?
- [ ] Do component props have interfaces?
- [ ] Are event handlers properly typed?

---

**With this guide, you can solve any TypeScript error!** 🚀

Remember: TypeScript errors are here to HELP you catch bugs early! 🐛✅
