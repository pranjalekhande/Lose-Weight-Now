import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MealLog = () => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({ type: 'breakfast', name: '', calories: '' });

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/meals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
    fetchMeals();
  }, []);

  const addMeal = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/meals',
        newMeal,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMeals([response.data, ...meals]);
      setNewMeal({ type: 'breakfast', name: '', calories: '' });
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Meal Log</h1>
      <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
        {/* Form Inputs for adding meals */}
      </div>
      <ul className="mt-4 space-y-2">
        {meals.map((meal) => (
          <li key={meal._id} className="bg-white p-4 rounded-lg shadow flex justify-between">
            <span>{meal.type} - {meal.name} ({meal.calories} kcal)</span>
            <span className="text-gray-600">{new Date(meal.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
      </div>
    </div>
  );
};

export default MealLog;
