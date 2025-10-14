import { useTasks } from '../context/TaskContext';

function FilterBar() {
  // 🔴 PROBLEM: Gets entire context, re-renders on ANY change
  const { filters, setStatusFilter, setCategoryFilter, setSearchFilter, resetFilters } = useTasks();

  // 🔴 UNCOMMENTED: This re-renders when tasks change even though it doesn't use tasks!
  console.log('🔴 FilterBar re-rendered - why? It only uses filters!');

  return (
    <div className="filter-bar">
      <div className="filter-grid">
        {/* Status Filter */}
        <div className="form-group">
          <label>Status</label>
          <div className="filter-buttons">
            <button
              className={`btn-filter ${filters.status === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button
              className={`btn-filter ${filters.status === 'active' ? 'active' : ''}`}
              onClick={() => setStatusFilter('active')}
            >
              Active
            </button>
            <button
              className={`btn-filter ${filters.status === 'completed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="form-group">
          <label>Category</label>
          <div className="filter-buttons">
            <button
              className={`btn-filter ${filters.category === 'all' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('all')}
            >
              All
            </button>
            <button
              className={`btn-filter ${filters.category === 'work' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('work')}
            >
              💼 Work
            </button>
            <button
              className={`btn-filter ${filters.category === 'personal' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('personal')}
            >
              🏠 Personal
            </button>
            <button
              className={`btn-filter ${filters.category === 'shopping' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('shopping')}
            >
              🛒 Shopping
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="form-group">
          <label>Search</label>
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={resetFilters} style={{ marginTop: '1rem' }}>
        Reset Filters
      </button>
    </div>
  );
}

export default FilterBar;
