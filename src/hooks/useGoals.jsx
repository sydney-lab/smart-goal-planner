import { useState, useEffect } from 'react';
import { getGoals, createGoal, updateGoal, deleteGoalById, depositToGoal } from '../services/index.jsx';

/**
 * Custom hook for managing goals
 * @returns {Object} Goals state and methods
 */
export const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch goals on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  // Fetch all goals
  const fetchGoals = async () => {
    try {
      setLoading(true);
      const data = await getGoals();
      setGoals(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching goals:', err);
      setError('Failed to load goals. Please check if json-server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new goal
  const addGoal = async (newGoal) => {
    try {
      const goalToAdd = {
        ...newGoal,
        targetAmount: Number(newGoal.targetAmount),
        savedAmount: Number(newGoal.savedAmount || 0)
      };
      
      const addedGoal = await createGoal(goalToAdd);
      setGoals(prev => [...prev, addedGoal]);
      return addedGoal;
    } catch (err) {
      console.error('Error adding goal:', err);
      setError('Failed to add goal');
      throw err;
    }
  };

  // Update an existing goal
  const editGoal = async (updatedGoal) => {
    try {
      const result = await updateGoal(updatedGoal);
      setGoals(prev => prev.map(goal => goal.id === result.id ? result : goal));
      return result;
    } catch (err) {
      console.error('Error updating goal:', err);
      setError('Failed to update goal');
      throw err;
    }
  };

  // Delete a goal
  const removeGoal = async (goalId) => {
    try {
      await deleteGoalById(goalId);
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    } catch (err) {
      console.error('Error deleting goal:', err);
      setError('Failed to delete goal');
      throw err;
    }
  };

  // Make a deposit to a goal
  const makeDeposit = async (goalId, amount) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) throw new Error('Goal not found');

      const updatedAmount = goal.savedAmount + Number(amount);
      const updatedGoal = await depositToGoal(goalId, updatedAmount);
      
      setGoals(prev => prev.map(g => g.id === updatedGoal.id ? updatedGoal : g));
      return updatedGoal;
    } catch (err) {
      console.error('Error making deposit:', err);
      setError('Failed to make deposit');
      throw err;
    }
  };

  return {
    goals,
    loading,
    error,
    addGoal,
    editGoal,
    removeGoal,
    makeDeposit,
    refreshGoals: fetchGoals
  };
};