import React, { useState } from "react";

function GoalForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    savedAmount: 0,
    category: "",
    deadline: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      targetAmount: "",
      savedAmount: 0,
      category: "",
      deadline: "",
      createdAt: new Date().toISOString().split("T")[0],
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Goal Name" required />
      <input name="targetAmount" type="number" value={formData.targetAmount} onChange={handleChange} placeholder="Target Amount" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
