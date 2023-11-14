import { render, screen } from '@testing-library/react';
import AuthForm from '../pages/auth-form';

/*  test the behavior of the AuthForm component itself. 
    For example, you can check if it renders correctly and if it 
    passes the correct props to the Auth component.
*/
test('renders AuthForm with correct props', () => {
  render(<AuthForm />);
  
  const authComponent = screen.getByTestId('auth-component');
  expect(authComponent).toBeInTheDocument();

 
  expect(authComponent).toHaveAttribute('theme', 'dark');
  expect(authComponent).toHaveAttribute('showLinks', 'true');
  expect(authComponent).toHaveAttribute('redirectTo', 'http://localhost:3000/auth/callback');
});