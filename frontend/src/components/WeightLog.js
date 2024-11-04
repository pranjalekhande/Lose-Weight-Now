import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WeightLog = () => {
  const [weights, setWeights] = useState([]);
  const [newWeight, setNewWeight] = useState('');

  useEffect(() => {
    const fetchWeights = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found. Make sure you're logged in.");
          return;
        }
        const response = await axios.get('http://localhost:3000/api/weights', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWeights(response.data);
        console.log("Weights fetched successfully:", response.data);
      } catch (error) {
        console.error('Error fetching weights:', error.message);
      }
    };
    fetchWeights();
  }, []);

  const addWeight = async () => {
    if (!newWeight) {
      console.error("Please enter a weight value.");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. Make sure you're logged in.");
        return;
      }
      const response = await axios.post(
        'http://localhost:3000/api/weights',
        { weight: newWeight },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Weight added:", response.data);
      setWeights([response.data, ...weights]);
      setNewWeight('');
    } catch (error) {
      console.error('Error adding weight:', error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Weight Log</h1>
      <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
        <input
          type="number"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          placeholder="Enter weight"
          className="w-full md:w-1/3 p-2 border rounded-md"
        />
        <button
          onClick={addWeight}
          className="w-full md:w-1/6 bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition duration-300"
        >
          Add Weight
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {weights.map((entry) => (
          <li key={entry._id} className="bg-white p-4 rounded-lg shadow flex justify-between">
            <span>{entry.weight} lbs</span>
            <span className="text-gray-600">{new Date(entry.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link to="/dashboard" className="text-blue-500 hover:underline">Home</Link>
      </div>
    </div>
  );
};

export default WeightLog;
