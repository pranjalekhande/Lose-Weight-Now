import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const [weights, setWeights] = useState([]);
  const [currentWeight, setCurrentWeight] = useState(0);

  useEffect(() => {
    const fetchWeights = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          history.push('/login');
          return;
        }
        const response = await axios.get('http://localhost:3000/api/weights', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWeights(response.data);
        if (response.data.length > 0) {
          setCurrentWeight(response.data[0].weight); // Set the latest weight
        }
      } catch (error) {
        console.error('Error fetching weights:', error.message);
      }
    };
    fetchWeights();
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Current Weight</h2>
          <p className="text-3xl font-bold text-blue-500">{currentWeight} lbs</p>
        </div>
        <Link
          to="/weight"
          className="block p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Weight Log
        </Link>
        <Link
          to="/meals"
          className="block p-6 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Meal Log
        </Link>
        <Link
          to="/exercise"
          className="block p-6 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Exercise Log
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full md:w-auto p-6 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
