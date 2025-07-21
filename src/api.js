
const API_URL = "http://localhost:3000/goals";


export function getGoals() {
  return fetch(API_URL).then((res) => res.json());
}


export function createGoal(goal) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  }).then((res) => res.json());
}


export function updateGoal(goal) {
  return fetch(`${API_URL}/${goal.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  }).then((res) => res.json());
}


export function deleteGoalById(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export function depositToGoal(id, newSavedAmount) {
  return fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ savedAmount: newSavedAmount }),
  }).then((res) => res.json());
}
