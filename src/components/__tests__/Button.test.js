import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  console.error = jest.fn();

  beforeEach(() => {
    console.error.mockClear();
  });

  it('adds the correct styling for a primary button', () => {
    render(<Button primary={true} />);

    const component = screen.getByRole('button');

    expect(component).toHaveClass(
      'bg-inspiringIndigo border-inspiringIndigo text-tandemGray hover:bg-breakthroughBlue',
      {
        exact: false,
      },
    );
  });

  it('adds the correct styling for a secondary button', () => {
    render(<Button secondary={true} />);

    const component = screen.getByRole('button');

    expect(component).toHaveClass(
      'bg-tandemGray border-inspiringIndigo text-inspiringIndigo hover:bg-inspiringIndigo hover:text-tandemGray',
      {
        exact: false,
      },
    );
  });

  it('adds the props className and basic styling if not primary or secondary', () => {
    render(<Button className="tertiary" />);

    const component = screen.getByRole('button');

    expect(component).toHaveClass('tertiary py-4 px-8 border-4');
  });

  it('validates primary prop', () => {
    render(<Button primary="shouldBeBoolean" />);

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('validates secondary prop', () => {
    render(<Button secondary="shouldBeBoolean" />);

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('validates className prop', () => {
    render(<Button className={true} />);

    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
