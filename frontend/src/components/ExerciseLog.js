import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExerciseLog = () => {
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({ name: '', duration: '', caloriesBurned: '' });

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/exercises', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };
    fetchExercises();
  }, []);

  const addExercise = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/exercises',
        newExercise,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExercises([response.data, ...exercises]);
      setNewExercise({ name: '', duration: '', caloriesBurned: '' });
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Exercise Log</h1>
      <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
        <input
          type="text"
          value={newExercise.name}
          onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
          placeholder="Exercise name"
          className="w-full md:w-1/3 p-2 border rounded-md"
        />
        <input
          type="number"
          value={newExercise.duration}
          onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
          placeholder="Duration (min)"
          className="w-full md:w-1/3 p-2 border rounded-md"
        />
        <input
          type="number"
          value={newExercise.caloriesBurned}
          onChange={(e) => setNewExercise({ ...newExercise, caloriesBurned: e.target.value })}
          placeholder="Calories burned"
          className="w-full md:w-1/3 p-2 border rounded-md"
        />
        <button
          onClick={addExercise}
          className="w-full md:w-1/6 bg-red-500 text-white py-2 rounded-md shadow hover:bg-red-600 transition duration-300"
        >
          Add Exercise
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {exercises.map((exercise) => (
          <li key={exercise._id} className="bg-white p-4 rounded-lg shadow flex justify-between">
            <span>{exercise.name} - {exercise.duration} mins ({exercise.caloriesBurned} kcal)</span>
            <span className="text-gray-600">{new Date(exercise.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
      </div>
    </div>
  );
};

export default ExerciseLog;
