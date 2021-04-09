import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  const lableName = 'Name';
  it('is grayed out when disabled', () => {
    render(<TextInput label={lableName} disabled={true} />);

    const component = screen.getByText(lableName);

    expect(component).toHaveClass('text-tandemDarkGray');
  });
  it('is not grayed out when not disabled', () => {
    render(<TextInput label={lableName} disabled={false} />);

    const component = screen.getByText(lableName);

    expect(component).not.toHaveClass('text-tandemDarkGray');
  });
});
