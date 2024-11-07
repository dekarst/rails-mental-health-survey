import React, { useState } from 'react';
import axios from 'axios';

interface SurveyAnswers {
  question1: string;
  question2: string;
  question3: string;
}

const API_URL = process.env.REACT_APP_API_URL;

const SurveyForm: React.FC = () => {
  const [answers, setAnswers] = useState<SurveyAnswers>({
    question1: '',
    question2: '',
    question3: '',
  });
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validate the answers before submission
    if (!answers.question1 || !answers.question2 || !answers.question3) {
      setError('All questions are required');
      setSuccessMessage('');
      return;
    }

    try {
      await axios.post(`${API_URL}/survey_responses`, {
        survey: { ...answers },
      });
      setSuccessMessage('Survey submitted successfully!');
      setError('');
      // Clear the form
      setAnswers({
        question1: '',
        question2: '',
        question3: '',
      });
    } catch (error) {
      setError('An error occurred while submitting the survey.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Mental Health Survey</h1>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {successMessage && <div className="text-green-600 text-center mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="question1" className="block text-lg font-medium text-gray-700">How are you feeling today?</label>
            <input
              type="text"
              id="question1"
              name="question1"
              value={answers.question1}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="question2" className="block text-lg font-medium text-gray-700">Rate your stress level from 1-5</label>
            <input
              type="number"
              id="question2"
              name="question2"
              value={answers.question2}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              min="1"
              max="5"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="question3" className="block text-lg font-medium text-gray-700">Any additional comments?</label>
            <textarea
              id="question3"
              name="question3"
              value={answers.question3}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
