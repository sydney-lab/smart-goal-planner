import { API_URL } from '../utils/constants.jsx';

/**
 * Fetch all goals from the API
 * @returns {Promise<Object[]>} Promise that resolves to an array of goals
 */
export async function getGoals() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch goals');
  return res.json();
}

/**
 * Create a new goal
 * @param {Object} goal - The goal object to create
 * @returns {Promise<Object>}
 */
export async function createGoal(goal) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error('Failed to create goal');
  return res.json();
}

/**
 * Update an existing goal
 * @param {Object} goal - The goal object to update (must include `id`)
 * @returns {Promise<Object>}
 */
export async function updateGoal(goal) {
  const res = await fetch(`${API_URL}/${goal.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error('Failed to update goal');
  return res.json();
}

/**
 * Delete a goal by ID
 * @param {string} id - The ID of the goal to delete
 * @returns {Promise<void>}
 */
export async function deleteGoalById(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete goal');
}

/**
 * Deposit to a goal's saved amount
 * @param {string} id - The ID of the goal to update
 * @param {number} newSavedAmount - The new saved amount
 * @returns {Promise<Object>}
 */
export async function depositToGoal(id, newSavedAmount) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ savedAmount: newSavedAmount }),
  });
  if (!res.ok) throw new Error('Failed to make deposit');
  return res.json();
}