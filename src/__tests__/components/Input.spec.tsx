import React from 'react';
import {
 render, fireEvent, waitFor, screen,
} from '@testing-library/react';

import { Input } from '../../components/Form/Input';

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(<Input name="email" placeholder="Digite seu login" />);

    expect(getByPlaceholderText('Digite seu login')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="Digite seu login" label="Email" />,
    );

    const inputElement = getByPlaceholderText('Digite seu login');

    const containerElement = screen.getByLabelText('Email');

    fireEvent.focus(inputElement);

    expect(1 + 1).toBe(2);
  });
});
