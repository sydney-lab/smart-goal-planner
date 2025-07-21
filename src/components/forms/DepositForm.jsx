import React, { useState } from "react";
import { formatCurrency, isGoalCompleted } from "../../utils/helpers.jsx";

function DepositForm({ goals, onDeposit }) {
  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Find the selected goal to show details
  const selectedGoal = goals.find(g => g.id === goalId);
  
  function handleSubmit(e) {
    e.preventDefault();
    onDeposit(goalId, Number(amount));
    setGoalId("");
    setAmount("");
    setShowForm(false);
  }

  // Only show non-completed goals in the dropdown
  const activeGoals = goals.filter(goal => !isGoalCompleted(goal));

  return (
    <div className="deposit-form-container">
      {!showForm ? (
        <button 
          className="deposit-btn" 
          onClick={() => setShowForm(true)}
        >
          💰 Make a Deposit
        </button>
      ) : (
        <div className="form-card">
          <h2>Make a Deposit</h2>
          {activeGoals.length === 0 ? (
            <p>All goals are completed! 🎉</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="goalSelect">Select Goal</label>
                <select 
                  id="goalSelect"
                  value={goalId} 
                  onChange={e => setGoalId(e.target.value)} 
                  required
                >
                  <option value="">Choose a goal</option>
                  {activeGoals.map(goal => (
                    <option key={goal.id} value={goal.id}>
                      {goal.name} ({formatCurrency(goal.savedAmount)} of {formatCurrency(goal.targetAmount)})
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedGoal && (
                <div className="goal-summary">
                  <p><strong>Target:</strong> {formatCurrency(selectedGoal.targetAmount)}</p>
                  <p><strong>Current:</strong> {formatCurrency(selectedGoal.savedAmount)}</p>
                  <p><strong>Remaining:</strong> {formatCurrency(selectedGoal.targetAmount - selectedGoal.savedAmount)}</p>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="amount">Deposit Amount ($)</label>
                <input 
                  id="amount"
                  type="number" 
                  min="1"
                  value={amount} 
                  onChange={e => setAmount(e.target.value)} 
                  placeholder="Enter amount" 
                  required 
                />
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Make Deposit</button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default DepositForm;
