import { useState, useRef } from 'react';

function PainTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const renderCountRef = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  // Track re-renders WITHOUT causing infinite loop
  if (isTracking) {
    renderCountRef.current += 1;
  }

  const startTracking = () => {
    renderCountRef.current = 0;
    setIsTracking(true);
    setDisplayCount(0);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setDisplayCount(renderCountRef.current);
  };

  const resetTracking = () => {
    renderCountRef.current = 0;
    setDisplayCount(0);
    setIsTracking(false);
  };

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
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.3)', borderRadius: '8px' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>📊 Re-render Counter</strong>
          {isTracking && <span style={{ color: '#d9534f', marginLeft: '0.5rem' }}>● TRACKING...</span>}
        </div>
        
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#667eea' }}>
          {isTracking ? renderCountRef.current : displayCount} renders
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-filter" 
            onClick={startTracking}
            disabled={isTracking}
            style={{ opacity: isTracking ? 0.5 : 1 }}
          >
            ▶️ Start Tracking
          </button>
          <button 
            className="btn-filter" 
            onClick={stopTracking}
            disabled={!isTracking}
            style={{ opacity: !isTracking ? 0.5 : 1 }}
          >
            ⏸️ Stop & Show
          </button>
          <button 
            className="btn-filter" 
            onClick={resetTracking}
          >
            🔄 Reset
          </button>
        </div>
        
        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#856404' }}>
          💡 Click "Start Tracking", then interact with the app (add task, filter, etc), then "Stop & Show"
        </div>
      </div>
    </div>
  );
}

export default PainTracker;
