import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WeightLog from './components/WeightLog';
import MealLog from './components/MealLog';
import ExerciseLog from './components/ExerciseLog';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route
            exact
            path="/"
            render={() => (isAuthenticated ? <Dashboard /> : <Redirect to="/login" />)}
          />
          <Route
            path="/weight"
            render={() => (isAuthenticated ? <WeightLog /> : <Redirect to="/login" />)}
          />
          <Route
            path="/meals"
            render={() => (isAuthenticated ? <MealLog /> : <Redirect to="/login" />)}
          />
          <Route
            path="/exercise"
            render={() => (isAuthenticated ? <ExerciseLog /> : <Redirect to="/login" />)}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
