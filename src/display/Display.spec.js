// Test away!
import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

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
test("Displays 'Closed' if the closed prop is true and 'Open' if otherwise", () => {
  const { getByText, getByTestId, rerender } = render(<Display closed />);
  getByTestId(/closed/i);

  rerender(<Display closed={false} />);
  getByText(/open/i);
});

// Test: displays 'Locked' if the locked prop is true and 'Unlocked' if otherwise
test("Displays 'Locked' if the locked prop is true and 'Unlocked' if otherwise", () => {
  const { getByText, rerender } = render(<Display locked />);
  getByText(/locked/i);

  rerender(<Display locked={false} />);
  getByText(/unlocked/i);
});

// Test: when locked or closed use the red-led class
test("Use the red-led class when locked or closed", () => {
  const { getByText } = render(<Display closed locked />);
  const lock = getByText(/locked/i);
  const close = getByText(/closed/i);

  expect(lock).toHaveClass("red-led");
  expect(close).toHaveClass("red-led");
});

// Test: when unlocked or open use the green-led class
test("Use the green-led class when unlocked or open", () => {
  const { getByText } = render(<Display closed={false} locked={false} />);
  const lock = getByText(/unlocked/i);
  const close = getByText(/open/i);

  expect(lock).toHaveClass("green-led");
  expect(close).toHaveClass("green-led");
});