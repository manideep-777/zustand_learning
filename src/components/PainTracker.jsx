import { useState, useEffect } from 'react';

function PainTracker() {
  const [rerenderCount, setRerenderCount] = useState(0);

  // Track re-renders
  useEffect(() => {
    setRerenderCount(prev => prev + 1);
  });

  return (
    <div className="pain-tracker">
      <h3>😫 Day 0 Pain Points Tracker</h3>
      <ul className="pain-list">
        <li>Context re-renders: Check console for "🔴 re-rendered" spam</li>
        <li>Spread operators: Count them in TaskContext.jsx (hint: 10+)</li>
        <li>Manual localStorage: Check the useEffect hooks</li>
        <li>No DevTools: Can't time-travel debug</li>
        <li>Filtering logic: Duplicated in components</li>
        <li>Provider wrapper: Required in App.jsx</li>
      </ul>
      <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        <strong>📊 This component re-rendered: {rerenderCount} times</strong>
        <br />
        <em>Open console to see ALL component re-renders!</em>
      </div>
    </div>
  );
}

export default PainTracker;
