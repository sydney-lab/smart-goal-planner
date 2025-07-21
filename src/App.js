import "./App.css";
import React, { useEffect, useState } from "react";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";
import { getGoals, createGoal, updateGoal, deleteGoalById, depositToGoal } from "./api";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getGoals().then(setGoals);
  }, []);

  function handleAddGoal(newGoal) {
    createGoal(newGoal).then((addedGoal) =>
      setGoals((prev) => [...prev, addedGoal])
    );
  }

  function handleUpdateGoal(updatedGoal) {
    updateGoal(updatedGoal).then((res) =>
      setGoals((prev) =>
        prev.map((goal) => (goal.id === res.id ? res : goal))
      )
    );
  }

  function handleDeleteGoal(goalId) {
    deleteGoalById(goalId).then(() =>
      setGoals((prev) => prev.filter((goal) => goal.id !== goalId))
    );
  }

  function handleDeposit(goalId, amount) {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    const updatedAmount = goal.savedAmount + amount;

    depositToGoal(goalId, updatedAmount).then((updatedGoal) =>
      setGoals((prev) =>
        prev.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
      )
    );
  }

  return (
    <div className="App">
      <h1>💰 Smart Goal Planner</h1>
      <Overview goals={goals} />
      <GoalForm onAdd={handleAddGoal} />
      <DepositForm goals={goals} onDeposit={handleDeposit} />
      <GoalList
        goals={goals}
        onUpdate={handleUpdateGoal}
        onDelete={handleDeleteGoal}
      />
    </div>
  );
}

export default App;
