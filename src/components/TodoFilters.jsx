import './TodoFilters.css'
const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

export default function TodoFilters({ filter, onFilterChange }) {
  return (
    <div className="todo-filters">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={filter === key ? "filter-btn active" : "filter-btn"}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}