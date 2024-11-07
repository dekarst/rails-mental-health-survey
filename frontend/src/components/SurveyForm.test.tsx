import axios from 'axios';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import SurveyForm from './SurveyForm';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SurveyForm', () => {
  it('renders the form fields', () => {
    render(<SurveyForm />);

    expect(screen.getByLabelText(/How are you feeling today?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rate your stress level from 1-5/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Any additional comments?/i)).toBeInTheDocument();
  });

  it('displays error if not all fields are filled out', async () => {
    render(<SurveyForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(submitButton);
    expect(await screen.findByText(/All questions are required/i)).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Survey submitted successfully' } });

    render(<SurveyForm />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/How are you feeling today?/i), { target: { value: 'Good' } });
      fireEvent.change(screen.getByLabelText(/Rate your stress level from 1-5/i), { target: { value: '3' } });
      fireEvent.change(screen.getByLabelText(/Any additional comments?/i), { target: { value: 'No comments' } });
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    expect(await screen.findByText(/Survey submitted successfully/i)).toBeInTheDocument();
  });

  it('displays error message on failed submission', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Submission error'));

    render(<SurveyForm />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/How are you feeling today?/i), { target: { value: 'Good' } });
      fireEvent.change(screen.getByLabelText(/Rate your stress level from 1-5/i), { target: { value: '3' } });
      fireEvent.change(screen.getByLabelText(/Any additional comments?/i), { target: { value: 'No comments' } });
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    expect(await screen.findByText(/An error occurred while submitting the survey/i)).toBeInTheDocument();
  });
});
