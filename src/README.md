# Smart Goal Planner - Source Code Structure

## Directory Structure

```
src/
├── components/
│   ├── forms/
│   │   ├── DepositForm.js - Form for making deposits to goals
│   │   ├── GoalForm.js - Form for creating/editing goals
│   │   └── index.js - Exports all form components
│   ├── goals/
│   │   ├── GoalCard.js - Individual goal display card
│   │   ├── GoalList.js - List of goals with filtering/sorting
│   │   └── index.js - Exports all goal components
│   └── ui/
│       ├── Overview.js - Dashboard overview statistics
│       ├── ProgressBar.js - Visual progress indicator
│       └── index.js - Exports all UI components
├── api.js - API functions for CRUD operations
├── App.js - Main application component
├── App.css - Main application styles
├── constants.js - Application constants
├── index.js - Application entry point
├── index.css - Global styles
├── utils.js - Utility functions
└── README.md - This file
```

## Key Files

- **api.js**: Contains all API functions for interacting with the json-server backend
- **constants.js**: Contains application constants like categories and sort options
- **utils.js**: Contains utility functions for formatting and calculations
- **App.js**: Main application component that manages state and renders components
- **App.css**: Contains all component styles

## Component Structure

### Forms
- **GoalForm.js**: Form for creating and editing goals
- **DepositForm.js**: Form for making deposits to goals

### Goals
- **GoalCard.js**: Card component for displaying individual goals
- **GoalList.js**: Component for displaying, filtering, and sorting goals

### UI
- **Overview.js**: Dashboard component showing statistics and alerts
- **ProgressBar.js**: Visual progress indicator for goals

## State Management

The application uses React's built-in state management with useState and useEffect hooks. The main state is managed in App.js and passed down to child components as props.

## API Integration

The application uses the Fetch API to interact with the json-server backend. All API functions are centralized in api.js.