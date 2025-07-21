/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @returns {string} The formatted amount
 */
export const formatCurrency = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

/**
 * Calculate days remaining until a deadline
 * @param {string} deadline - The deadline date string
 * @returns {number} The number of days remaining
 */
export const calculateDaysRemaining = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

/**
 * Format a date string to a readable format
 * @param {string} dateString - The date string to format
 * @returns {string} The formatted date
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Check if a goal is completed
 * @param {Object} goal - The goal object
 * @returns {boolean} Whether the goal is completed
 */
export const isGoalCompleted = (goal) => {
  return goal.savedAmount >= goal.targetAmount;
};

/**
 * Check if a goal is overdue
 * @param {Object} goal - The goal object
 * @returns {boolean} Whether the goal is overdue
 */
export const isGoalOverdue = (goal) => {
  const daysLeft = calculateDaysRemaining(goal.deadline);
  return daysLeft < 0 && !isGoalCompleted(goal);
};

/**
 * Check if a goal is due soon (within 30 days)
 * @param {Object} goal - The goal object
 * @returns {boolean} Whether the goal is due soon
 */
export const isGoalDueSoon = (goal) => {
  const daysLeft = calculateDaysRemaining(goal.deadline);
  return daysLeft <= 30 && daysLeft > 0 && !isGoalCompleted(goal);
};