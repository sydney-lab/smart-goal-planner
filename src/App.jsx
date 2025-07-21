import "./App.css";
import React from "react";
import { GoalList, GoalForm, DepositForm, Overview } from "./components/index.jsx";
import { useGoals } from "./hooks/index.jsx";

function App() {
  const { 
    goals, 
    loading, 
    error, 
    addGoal, 
    editGoal, 
    removeGoal, 
    makeDeposit 
  } = useGoals();

  function handleAddGoal(newGoal) {
    addGoal(newGoal);
  }

  function handleUpdateGoal(updatedGoal) {
    editGoal(updatedGoal);
  }

  function handleDeleteGoal(goalId) {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      removeGoal(goalId);
    }
  }

  function handleDeposit(goalId, amount) {
    makeDeposit(goalId, amount);
  }

  return (
    <div className="App">
      <header>
        <h1>💰 Smart Goal Planner</h1>
      </header>
      
      {loading ? (
        <div className="loading">Loading goals...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <Overview goals={goals} />
          
          <div className="actions-container">
            <GoalForm onAdd={handleAddGoal} />
            <DepositForm goals={goals} onDeposit={handleDeposit} />
          </div>
          
          <h2>Your Financial Goals</h2>
          {goals.length === 0 ? (
            <div className="empty-state">
              <p>You don't have any goals yet. Create your first goal to get started!</p>
            </div>
          ) : (
            <GoalList
              goals={goals}
              onUpdate={handleUpdateGoal}
              onDelete={handleDeleteGoal}
            />
          )}
        </>
      )}
      
      <footer>
        <p>© {new Date().getFullYear()} Smart Goal Planner - Track your financial goals</p>
      </footer>
    </div>
  );
}

export default App;
