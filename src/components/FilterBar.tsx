import useTaskStore from "../store/taskStore";
import type { FilterStatus, FilterCategory } from '../types';

function FilterBar() {
  // 🔴 PROBLEM: Gets entire context, re-renders on ANY change
  const filters = useTaskStore((state) => state.filters);
  const setStatusFilter = useTaskStore((state) => state.setStatusFilter);
  const setCategoryFilter = useTaskStore((state) => state.setCategoryFilter);
  const setSearchFilter = useTaskStore((state) => state.setSearchFilter);
  const resetFilters = useTaskStore((state) => state.resetFilters);

  // 🔴 UNCOMMENTED: This re-renders when tasks change even though it doesn't use tasks!
  console.log('✅ FilterBar re-rendered - Zustand selectors!');

  const handleStatusChange = (status: FilterStatus) => {
    setStatusFilter(status);
  };

  const handleCategoryChange = (category: FilterCategory) => {
    setCategoryFilter(category);
  };

  return (
    <div className="filter-bar">
      <div className="filter-grid">
        {/* Status Filter */}
        <div className="form-group">
          <label>Status</label>
          <div className="filter-buttons">
            <button
              className={`btn-filter ${filters.status === 'all' ? 'active' : ''}`}
              onClick={() => handleStatusChange('all')}
            >
              All
            </button>
            <button
              className={`btn-filter ${filters.status === 'active' ? 'active' : ''}`}
              onClick={() => handleStatusChange('active')}
            >
              Active
            </button>
            <button
              className={`btn-filter ${filters.status === 'completed' ? 'active' : ''}`}
              onClick={() => handleStatusChange('completed')}
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
              onClick={() => handleCategoryChange('all')}
            >
              All
            </button>
            <button
              className={`btn-filter ${filters.category === 'work' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('work')}
            >
              💼 Work
            </button>
            <button
              className={`btn-filter ${filters.category === 'personal' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('personal')}
            >
              🏠 Personal
            </button>
            <button
              className={`btn-filter ${filters.category === 'shopping' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('shopping')}
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
