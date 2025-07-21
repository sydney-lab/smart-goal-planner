import React from "react";
import { formatCurrency, formatDate, isGoalCompleted, isGoalOverdue, isGoalDueSoon } from "../../utils/helpers.jsx";

function Overview({ goals }) {
  // Calculate statistics
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const completed = goals.filter(g => g.savedAmount >= g.targetAmount);
  const completedCount = completed.length;
  const completionRate = totalGoals > 0 ? Math.round((completedCount / totalGoals) * 100) : 0;
  
  // Calculate goals with approaching deadlines (within 30 days)
  const today = new Date();
  const approachingDeadlines = goals.filter(g => {
    const deadline = new Date(g.deadline);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft > 0 && g.savedAmount < g.targetAmount;
  });
  
  // Calculate overdue goals
  const overdueGoals = goals.filter(g => {
    const deadline = new Date(g.deadline);
    return deadline < today && g.savedAmount < g.targetAmount;
  });

  return (
    <div className="overview">
      <h2>💰 Financial Goals Dashboard</h2>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Goals</h3>
          <p className="stat-number">{totalGoals}</p>
          <p className="stat-label">Total Goals</p>
        </div>
        
        <div className="stat-card">
          <h3>Saved</h3>
          <p className="stat-number">{formatCurrency(totalSaved)}</p>
          <p className="stat-label">of {formatCurrency(totalTarget)}</p>
        </div>
        
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{completedCount}</p>
          <p className="stat-label">{completionRate}% of goals</p>
        </div>
      </div>
      
      {approachingDeadlines.length > 0 && (
        <div className="alert warning">
          <h4>⏳ Approaching Deadlines</h4>
          <ul>
            {approachingDeadlines.map(goal => (
              <li key={goal.id}>
                <strong>{goal.name}</strong> - Due on {formatDate(goal.deadline)}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {overdueGoals.length > 0 && (
        <div className="alert danger">
          <h4>⚠️ Overdue Goals</h4>
          <ul>
            {overdueGoals.map(goal => (
              <li key={goal.id}>
                <strong>{goal.name}</strong> - Was due on {formatDate(goal.deadline)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Overview;
