import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';


describe('App Component', () => {
  // This block runs before each test to reset mocks and clear any fetch stubs
  beforeEach(() => {
    // Reset all mocks to ensure tests are isolated
    vi.resetAllMocks();
    // Clear any stubbed global fetch mocks from previous tests
    vi.unstubAllGlobals();
  });

  // Test 1: Ensures the app renders correctly without crashing
  it('renders without crashing', () => {
    render(<App />);
    // Check if the word "Ordbok" is displayed on the screen
    expect(screen.getByText('Ordbok')).toBeInTheDocument();
  });

  // Test 2: Simulates typing in the search input and checks if the value updates correctly
  it('updates search input value', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    
    // Simulate user typing "test" into the input field
    await userEvent.type(input, 'test');
    
    // Check if the input field contains the typed value
    expect(input).toHaveValue('test');
  });

  // Test 3: Simulates a successful search and checks if results are displayed
  it('displays results when search is successful', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    // Simulate typing "test" and clicking the search button
    await userEvent.type(input, 'test');
    await userEvent.click(button);

    // Wait for the result to appear and verify it is displayed
    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('A challenge, trial.')).toBeInTheDocument();
    });

    // Check if the audio element has the correct audio source URL
    expect(screen.getByTestId('audio')).toHaveAttribute('src', 'https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3');
  });

  // Test 4: Simulates a failed search and checks if the error message is displayed
  it('displays error when search fails', async () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    // Simulate typing a non-existent word and clicking the search button
    await userEvent.type(input, 'nonexistentword');
    await userEvent.click(button);

    // Wait for the error message to appear and verify it is displayed
    await waitFor(() => {
      expect(screen.getByText('Word not found')).toBeInTheDocument();
    });
  });

  // Test 5: Simulates clicking the search button without entering any text and checks for an error
  it('displays error when search is empty', async () => {
    render(<App />);
    const button = screen.getByRole('button');

    // Simulate clicking the search button without typing any input
    await userEvent.click(button);

    // Wait for the error message to appear and verify it is displayed
    await waitFor(() => {
      expect(screen.getByText('Word not found')).toBeInTheDocument();
    });
  });
});
