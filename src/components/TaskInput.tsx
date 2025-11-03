import { ChangeEvent, FormEvent, useState } from 'react';
// 🧪 TEMPORARY: Import Zustand store to test it
import useTaskStore from '../store/taskStore';
import type { Category, Priority } from '../types';

interface FormData {
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  dueDate: string;
}

function TaskInput() {
    const addTask = useTaskStore((state) => state.addTask);

    // 🧪 TEMPORARY: Test if Zustand store works
    // console.log('🧪 Testing Zustand Store:', useTaskStore.getState());

    // 🔴 UNCOMMENTED: This re-renders even though it only needs addTask function!
    console.log('✅ TaskInput re-rendered - using Zustand selector!');

    // ✅ LOCAL STATE: This is fine! Form state should be local
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        category: 'work',
        priority: 'medium',
        dueDate: ''
    });

    // TODO: Implement handleChange
    // Requirements:
    // 1. Update formData when user types
    // 2. Handle all input types (text, select, textarea, date)
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // YOUR CODE HERE
        // Hint: setFormData(prev => ({ ...prev, [name]: value }))

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // TODO: Implement handleSubmit
    // Requirements:
    // 1. Prevent default form submission
    // 2. Validate that title is not empty
    // 3. Call addTask with formData
    // 4. Reset form after submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // YOUR CODE HERE
        // 1. Check if title is empty, if so return
        // 2. Call addTask(formData)
        // 3. Reset formData to initial state
        if (formData.title.trim() === '') return;
        addTask({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate).getTime() : undefined
    });
        setFormData({
            title: '',
            description: '',
            category: 'work',
            priority: 'medium',
            dueDate: ''
        })
    };

    return (
        <div className="task-input-container">
            <h2>➕ Add New Task</h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Task Title *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="What needs to be done?"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add more details..."
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="work">💼 Work</option>
                            <option value="personal">🏠 Personal</option>
                            <option value="shopping">🛒 Shopping</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="low">🟢 Low</option>
                            <option value="medium">🟡 Medium</option>
                            <option value="high">🔴 High</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Due Date (Optional)</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default TaskInput;
