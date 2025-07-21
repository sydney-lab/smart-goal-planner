import React, { useState } from "react";
import { CATEGORIES } from "../../utils/constants.jsx";

function GoalForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    savedAmount: 0,
    category: "",
    deadline: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const [showForm, setShowForm] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === "targetAmount" ? Number(value) : value 
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({
      ...formData,
      targetAmount: Number(formData.targetAmount),
      savedAmount: Number(formData.savedAmount)
    });
    setFormData({
      name: "",
      targetAmount: "",
      savedAmount: 0,
      category: "",
      deadline: "",
      createdAt: new Date().toISOString().split("T")[0],
    });
    setShowForm(false);
  }

  return (
    <div className="goal-form-container">
      {!showForm ? (
        <button 
          className="add-goal-btn" 
          onClick={() => setShowForm(true)}
        >
          + Add New Goal
        </button>
      ) : (
        <div className="form-card">
          <h2>Create New Goal</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Goal Name</label>
              <input 
                id="name"
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g., Travel Fund - Japan" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="targetAmount">Target Amount ($)</label>
              <input 
                id="targetAmount"
                name="targetAmount" 
                type="number" 
                min="1"
                value={formData.targetAmount} 
                onChange={handleChange} 
                placeholder="e.g., 5000" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select 
                id="category"
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required
              >
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input 
                id="deadline"
                name="deadline" 
                type="date" 
                value={formData.deadline} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-buttons">
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="primary-btn">Create Goal</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default GoalForm;
