// import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskCounter from './components/TaskCounter';
import TaskInput from './components/TaskInput';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import PainTracker from './components/PainTracker';

function App() {
  return (
    // 🔴 PROBLEM: Need to wrap entire app in Provider
    // <TaskProvider>
      <div className="app">
        <Header />
        <TaskCounter />
        <TaskInput />
        <FilterBar />
        <TaskList />
        <PainTracker />
      </div>
    // </TaskProvider>
  );
}

export default App;
