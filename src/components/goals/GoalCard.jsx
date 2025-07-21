import React, { useState } from "react";
import ProgressBar from "../ui/ProgressBar.jsx";
import { formatCurrency, calculateDaysRemaining, formatDate, isGoalCompleted, isGoalOverdue, isGoalDueSoon } from "../../utils/helpers.jsx";

function GoalCard({ goal, onUpdate, onDelete }) {
  const { id, name, targetAmount, savedAmount, deadline, category, createdAt } = goal;
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);

  const remaining = targetAmount - savedAmount;
  const isComplete = isGoalCompleted({ savedAmount, targetAmount });
  const daysLeft = calculateDaysRemaining(deadline);
  const isOverdue = isGoalOverdue({ savedAmount, targetAmount, deadline });
  const isClose = isGoalDueSoon({ savedAmount, targetAmount, deadline });
  
  // Format the deadline for display
  const formattedDeadline = formatDate(deadline);
  
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((savedAmount / targetAmount) * 100), 100);

  function handleChange(e) {
    const { name, value } = e.target;
    setEditedGoal({
      ...editedGoal,
      [name]: name === "targetAmount" || name === "savedAmount" ? Number(value) : value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(editedGoal);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedGoal(goal);
    setIsEditing(false);
  }

  return (
    <div className={`goal-card ${isComplete ? 'complete' : ''} ${isOverdue ? 'overdue' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input 
            name="name" 
            value={editedGoal.name} 
            onChange={handleChange} 
            placeholder="Goal Name" 
            required 
          />
          <input 
            name="targetAmount" 
            type="number" 
            value={editedGoal.targetAmount} 
            onChange={handleChange} 
            placeholder="Target Amount" 
            required 
          />
          <input 
            name="category" 
            value={editedGoal.category} 
            onChange={handleChange} 
            placeholder="Category" 
            required 
          />
          <input 
            name="deadline" 
            type="date" 
            value={editedGoal.deadline} 
            onChange={handleChange} 
            required 
          />
          <div className="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="goal-header">
            <h3>{name}</h3>
            {isComplete && <span className="status complete">✅ Completed</span>}
            {isOverdue && <span className="status overdue">⚠️ Overdue</span>}
            {isClose && <span className="status warning">⏳ Due soon</span>}
          </div>
          
          <div className="goal-details">
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Target:</strong> {formatCurrency(targetAmount)}</p>
            <p><strong>Saved:</strong> {formatCurrency(savedAmount)}</p>
            <p><strong>Remaining:</strong> {formatCurrency(remaining)}</p>
            <p><strong>Deadline:</strong> {formattedDeadline}</p>
            <p><strong>Time left:</strong> {isOverdue ? "Past deadline" : daysLeft === 0 ? "Due today" : `${daysLeft} days`}</p>
          </div>
          
          <div className="progress-section">
            <ProgressBar saved={savedAmount} target={targetAmount} />
            <p className="progress-text">{progressPercentage}% complete</p>
          </div>
          
          <div className="button-group">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default GoalCard;
