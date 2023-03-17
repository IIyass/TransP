import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NumberGame from './NumberGame';

describe('NumberGame', () => {
  test('renders the title and input form', () => {
    render(<NumberGame />);

    const title = screen.getByText('Guess a number between 1 and 100:');
    const input = screen.getByRole('spinbutton');
    expect(title).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test('displays "Try again! Too low." message for a low guess', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9);

    render(<NumberGame />);
    const input = screen.getByRole('spinbutton');
    const submit = screen.getByRole('button');
    fireEvent.change(input, { target: { value: '75' } });
    fireEvent.click(submit);
    const message = screen.getByText(/Try again! Too low\./);
    expect(message).toBeInTheDocument();
  });

  test('displays "Try again! Too high." message for a high guess', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.6);

    render(<NumberGame />);
    const input = screen.getByRole('spinbutton');
    const submit = screen.getByRole('button');
    fireEvent.change(input, { target: { value: '75' } });
    fireEvent.click(submit);
    const message = screen.getByText('Try again! Too high.');
    expect(message).toBeInTheDocument();
  });
  test('displays "You win!" message for a correct guess', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.6);
    render(<NumberGame />);
    const input = screen.getByRole('spinbutton');
    const submit = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 61 } });
    fireEvent.click(submit);
    const message = screen.getByText('You win!');
    expect(message).toBeInTheDocument();
  });
});
