import React from "react";
import ProgressBar from "./ProgressBar";

function GoalCard({ goal, onUpdate, onDelete }) {
  const { name, targetAmount, savedAmount, deadline, category } = goal;

  const remaining = targetAmount - savedAmount;
  const isComplete = savedAmount >= targetAmount;
  const timeLeft = new Date(deadline) - new Date();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0 && !isComplete;
  const isClose = daysLeft <= 30 && daysLeft > 0 && !isComplete;

  return (
    <div className="goal-card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Target: ${targetAmount}</p>
      <p>Saved: ${savedAmount}</p>
      <p>Remaining: ${remaining}</p>
      <p>Deadline: {deadline}</p>
      {isOverdue && <p className="overdue">⚠️ Overdue!</p>}
      {isClose && <p className="warning">⏳ Less than 30 days!</p>}
      <ProgressBar saved={savedAmount} target={targetAmount} />
      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  );
}

export default GoalCard;
