
/**
 * Task priority levels
 */
export type Priority = 'low' | 'medium' | 'high';

/**
 * Task categories
 */
export type Category = 'work' | 'personal' | 'shopping';

/**
 * Filter status options
 */
export type FilterStatus = 'all' | 'active' | 'completed';

/**
 * Filter category options (includes 'all')
 */
export type FilterCategory = 'all' | Category;

/**
 * Complete Task model
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  createdAt: number;
  dueDate?: number;
}

/**
 * Filter state structure
 */
export interface FilterState {
  status: FilterStatus;
  category: FilterCategory;
  search: string;
}

/**
 * Type for creating a new task (without auto-generated fields)
 */
export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'completed'>;

/**
 * Type for updating a task (all fields optional)
 */
export type TaskUpdate = Partial<Omit<Task, 'id' | 'createdAt'>>;
