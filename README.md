# 💰 Smart Goal Planner

Smart Goal Planner is a React application designed for fintech users to manage multiple savings goals with full CRUD (Create, Read, Update, Delete) functionality. It uses a `json-server` backend to store goal data locally.

---

## 📁 Project Structure

```
smart-goal-planner/
├── public/
├── src/
│   ├── components/
│   │   ├── GoalCard.js
│   │   ├── GoalForm.js
│   │   ├── GoalList.js
│   │   ├── DepositForm.js
│   │   ├── Overview.js
│   │   └── ProgressBar.js
│   ├── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── db.json
├── package.json
└── README.md
```

---

## 🚀 Features

- **Goal Management**: Create, view, update, and delete financial goals
- **Progress Tracking**: Visual progress bars and completion status for each goal
- **Deposits**: Make deposits to any goal and track progress
- **Dashboard Overview**: See total savings, completed goals, and approaching deadlines
- **Smart Alerts**: Warnings for goals with approaching deadlines or overdue status
- **Filtering & Sorting**: Sort goals by various criteria and filter by category or status

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js and npm installed:

```bash
node -v
npm -v
```

---

### 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/smart-goal-planner.git
   cd smart-goal-planner
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

### 📦 Setting Up the Backend (`json-server`)

1. The `db.json` file in the root folder has the following structure:

   ```json
   {
     "goals": [
       {
         "id": "1",
         "name": "Travel Fund - Japan",
         "targetAmount": 5000,
         "savedAmount": 3200,
         "category": "Travel",
         "deadline": "2025-12-31",
         "createdAt": "2024-01-15"
       },
       ...
     ]
   }
   ```

2. Start the JSON server:

   ```bash
   npx json-server --watch db.json --port 3000
   ```

   The server will be available at:
   `http://localhost:3000/goals`

---

### 🖥️ Run the Frontend App

In another terminal:

```bash
npm start
```

If json-server is running on port 3000, you may need to run the React app on a different port:

```bash
PORT=3001 npm start
```

---

## 🔁 API Endpoints

* `GET /goals` – Fetch all goals
* `POST /goals` – Add a new goal
* `PUT /goals/:id` – Update a goal
* `PATCH /goals/:id` – Update specific fields of a goal (e.g., savedAmount)
* `DELETE /goals/:id` – Delete a goal

---

## 💸 Goal Data Structure

```json
{
  "id": "1",
  "name": "Travel Fund - Japan",
  "targetAmount": 5000,
  "savedAmount": 3200,
  "category": "Travel",
  "deadline": "2025-12-31",
  "createdAt": "2024-01-15"
}
```

| Field | Description |
|-------|-------------|
| id | Unique identifier for the goal |
| name | Name of the financial goal |
| targetAmount | Target amount to save |
| savedAmount | Current amount saved |
| category | Category of the goal (e.g., Travel, Emergency, Education) |
| deadline | Target date to reach the goal |
| createdAt | Date when the goal was created |

---

## 🧪 Testing

Visit the app in your browser and try the following:

1. Create a new goal with a name, target amount, category, and deadline
2. Make deposits to different goals
3. Edit existing goals
4. Delete goals
5. Filter and sort goals by different criteria
6. Check the dashboard overview for statistics

---

## 🧳 Deployment

You can deploy your frontend using:

* [Netlify](https://netlify.com/)
* [Vercel](https://vercel.com/)

If needed, you can also deploy your `json-server` backend using [Render](https://render.com/) for free.

---

## 📌 Notes

* The app includes smart features like deadline warnings and progress tracking
* Backend is mocked using `json-server` - not intended for production use

---

## 👨‍💻 Author

**Sydney Osindi**