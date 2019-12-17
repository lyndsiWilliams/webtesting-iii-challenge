// Test away!
import React from 'react';
import { render } from '@testing-library/react';

import Display from './Display';


// TESTS BEGIN

// Test: Component renders
test("Display renders without crashing", () => {
  render(<Display />);
});

// Test: displays if gate is open/closed and if it is locked/unlocked
test("Check open/closed and locked/unlocked display", () => {
  const { getByText, getByTestId } = render(<Display />);
  
  getByText(/open/i);
  getByText(/unlocked/i);
  getByText(/locked/i);
  getByTestId(/closed/i);
});

// Test: displays 'Closed' if the closed prop is true and 'Open' if otherwise

// Test: displays 'Locked' if the locked prop is true and 'Unlocked' if otherwise

// Test: when locked or closed use the red-led class

// Test: when unlocked or open use the green-led class