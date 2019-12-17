// Test away!
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// Component
import Controls from './Controls';


// TESTS BEGIN

// Test: Component renders
test("Controls renders without crashing", () => {
  render(<Controls />);
});

// Test: provide buttons to toggle the closed and locked states.
test("Check that 'gate' buttons exist", () => {
  const { getAllByText } = render(<Controls />);
  const buttons = getAllByText(/gate/i);

  expect(buttons).toBeDefined();
});

// Test: defaults to unlocked and open
test("Gate defaults to unlock and open", () => {
    const { getByText } = render(<Controls locked closed />)

    getByText('Unlock Gate' && 'Open Gate')
});

// Test: buttons' text changes to reflect the state the door will be in if clicked
test("Check for proper text display upon button clicks", () => {
  const { getByText, rerender } = render(<Controls closed locked />);
  getByText(/Unlock Gate/i);
  getByText(/Open Gate/i);

  rerender(<Controls closed={false} locked={false} />);
  getByText(/lock Gate/i);
  getByText(/close Gate/i);
});

// Test: the closed toggle button is disabled if the gate is locked
test("Check that closed toggle button is disabled if gate is locked", () => {
  const toggleClosed = jest.fn();
  const { getByText } = render(<Controls locked toggleClosed={toggleClosed} />);
  const closedBtn = getByText(/close gate/i);

  fireEvent.click(closedBtn);
  expect(toggleClosed).not.toHaveBeenCalled();
});

// Test: the locked toggle button is disabled if the gate is open
test("Check that locked toggle button is disabled if gate is open", () => {
  const toggleLocked = jest.fn();
  const { getByText } = render(<Controls closed={false} toggleLocked={toggleLocked} />);
  const lockedBtn = getByText(/lock gate/i);

  fireEvent.click(lockedBtn);
  expect(toggleLocked).not.toHaveBeenCalled();
});