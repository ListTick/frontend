import { ChangeEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../types/routes';
import './Sign.scss';

const SignIn = ({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log('Signed in with: ' + email + ' ' + password);
    navigate(AppRoutes.HOME);
  };

  return (
    <div className='sign'>
      <div className='sign__content'>
        <div className='sign__text'>
          <h2>Welcome!</h2>
          <p>Sign in to your account</p>
        </div>
        <div className='sign__content--inputs'>
          <TextField
            id='email'
            label='Email'
            variant='outlined'
            type='email'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextField
            id='password'
            label='Password'
            variant='outlined'
            type='password'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button type='submit' onClick={handleSignIn}>
          Sign In
        </Button>
        <div className='sign__content--text'>
          <p>
            Don't have an account?{' '}
            <span className='sign__content--text-sign' onClick={onSwitchToSignUp}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
