# 💸 Smart Goal Planner

Smart Goal Planner is a simple React application designed for fintech users to manage multiple savings goals with full CRUD (Create, Read, Update, Delete) functionality. It uses a `json-server` backend to store goal data locally.

---

## 📁 Project Structure

```

smart-goal-planner/
├── public/
├── src/
│   ├── components/
│   │   ├── GoalCard.js
│   │   ├── GoalForm.js
│   │   └── NavBar.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Goals.js
│   │   └── ErrorPage.js
│   ├── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── db.json ✅
├── package.json
└── README.md

````

---

## 🚀 Features

- View a list of savings goals
- Create new goals
- Update existing goals
- Delete goals
- Navigation between pages using React Router

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js and npm installed:

```bash
node -v
npm -v
````

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

1. Create a `db.json` file in the root folder with the following structure:

   ```json
   {
     "goals": [
       {
         "id": 1,
         "title": "Save for Emergency Fund",
         "targetAmount": 100000,
         "currentAmount": 25000
       },
       {
         "id": 2,
         "title": "Vacation to Mombasa",
         "targetAmount": 50000,
         "currentAmount": 10000
       }
     ]
   }
   ```

2. Start the JSON server:

   ```bash
   npx json-server --watch db.json --port 3001
   ```

   The server will be available at:
   `http://localhost:3001/goals`

---

### 🖥️ Run the Frontend App

In another terminal:

```bash
npm start
```

This will run the React app on:
`http://localhost:3000`

---

## 🔁 API Endpoints

* `GET /goals` – Fetch all goals
* `POST /goals` – Add a new goal
* `PATCH /goals/:id` – Update a goal
* `DELETE /goals/:id` – Delete a goal

---

## 🧪 Testing

Visit `http://localhost:3000` and interact with your app. Create, edit, and delete goals, and confirm the JSON data updates in `db.json`.

---

## 🧳 Deployment

You can deploy your frontend using:

* [Netlify](https://netlify.com/)
* [Vercel](https://vercel.com/)

If needed, you can also deploy your `json-server` backend using [Render](https://render.com/) for free.

---

## 📌 Notes

* This project uses `react-router-dom` for client-side routing.
* Backend is mocked using `json-server`. Not intended for production use.

---

## 👨‍💻 Author

**Sydney Osindi**
