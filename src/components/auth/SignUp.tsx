import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './Sign.scss';

const SignUp = ({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Signed up with: ' + email + ' ' + username + ' ' + password);
    onSwitchToSignIn();
  };

  return (
    <div className='sign'>
      <div className='sign__content'>
        <div className='sign__text'>
          <h2>Create account!</h2>
        </div>
        <div className='sign__content--inputs'>
          <TextField
            id='email'
            label='Email'
            variant='outlined'
            type='email'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextField
            id='username'
            label='Username'
            variant='outlined'
            type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <TextField
            id='password'
            label='Password'
            variant='outlined'
            type='password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
        <Button type='submit' onClick={() => handleSignUp()}>
          Sign Up
        </Button>
        <div className='sign__content--text'>
          <p>
            Already have an account?{' '}
            <span className='sign__content--text-sign' onClick={onSwitchToSignIn}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
