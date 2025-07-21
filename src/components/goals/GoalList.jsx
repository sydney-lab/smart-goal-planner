import React, { useState, useMemo } from "react";
import { GoalCard } from "./index.jsx";
import { CATEGORIES, SORT_OPTIONS, FILTER_STATUS } from "../../utils/constants.jsx";

function GoalList({ goals, onUpdate, onDelete }) {
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.DEADLINE);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Get unique categories from goals
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(goals.map(goal => goal.category))];
    return uniqueCategories.sort();
  }, [goals]);

  // Filter and sort goals
  const filteredAndSortedGoals = useMemo(() => {
    // First, filter the goals
    let result = [...goals];
    
    if (filterCategory) {
      result = result.filter(goal => goal.category === filterCategory);
    }
    
    if (filterStatus === FILTER_STATUS.COMPLETED) {
      result = result.filter(goal => goal.savedAmount >= goal.targetAmount);
    } else if (filterStatus === FILTER_STATUS.IN_PROGRESS) {
      result = result.filter(goal => goal.savedAmount < goal.targetAmount);
    } else if (filterStatus === FILTER_STATUS.OVERDUE) {
      result = result.filter(goal => {
        const isComplete = goal.savedAmount >= goal.targetAmount;
        const isPastDeadline = new Date(goal.deadline) < new Date();
        return !isComplete && isPastDeadline;
      });
    } else if (filterStatus === FILTER_STATUS.DUE_SOON) {
      result = result.filter(goal => {
        const isComplete = goal.savedAmount >= goal.targetAmount;
        const deadline = new Date(goal.deadline);
        const today = new Date();
        const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        return !isComplete && daysLeft <= 30 && daysLeft > 0;
      });
    }
    
    // Then, sort the filtered goals
    return result.sort((a, b) => {
      switch (sortBy) {
        case SORT_OPTIONS.NAME:
          return a.name.localeCompare(b.name);
        case SORT_OPTIONS.DEADLINE:
          return new Date(a.deadline) - new Date(b.deadline);
        case SORT_OPTIONS.AMOUNT:
          return b.targetAmount - a.targetAmount;
        case SORT_OPTIONS.PROGRESS:
          const progressA = a.savedAmount / a.targetAmount;
          const progressB = b.savedAmount / b.targetAmount;
          return progressB - progressA;
        case SORT_OPTIONS.CREATED:
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
  }, [goals, sortBy, filterCategory, filterStatus]);

  return (
    <div>
      <div className="filters-container">
        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value={SORT_OPTIONS.DEADLINE}>Deadline (Closest First)</option>
            <option value={SORT_OPTIONS.NAME}>Name (A-Z)</option>
            <option value={SORT_OPTIONS.AMOUNT}>Target Amount (Highest First)</option>
            <option value={SORT_OPTIONS.PROGRESS}>Progress (Highest First)</option>
            <option value={SORT_OPTIONS.CREATED}>Recently Added</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value={FILTER_STATUS.ALL}>All Statuses</option>
            <option value={FILTER_STATUS.COMPLETED}>Completed</option>
            <option value={FILTER_STATUS.IN_PROGRESS}>In Progress</option>
            <option value={FILTER_STATUS.OVERDUE}>Overdue</option>
            <option value={FILTER_STATUS.DUE_SOON}>Due Soon (30 days)</option>
          </select>
        </div>
      </div>
      
      {filteredAndSortedGoals.length === 0 ? (
        <p className="no-results">No goals match your current filters.</p>
      ) : (
        <div className="goal-list">
          {filteredAndSortedGoals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalList;
