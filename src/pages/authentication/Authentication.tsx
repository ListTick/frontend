import { useState } from 'react';
import SignIn from '../../components/auth/SignIn';
import SignUp from '../../components/auth/SignUp';
import './Authentication.scss';

enum AuthState {
  SignUp,
  SignIn
}

const Authentication = () => {
  const [authState, setAuthState] = useState(AuthState.SignIn);

  return (
    <div className='authentication'>  
      {authState === AuthState.SignUp ? (
        <SignUp onSwitchToSignIn={() => setAuthState(AuthState.SignIn)} />
      ) : (
        <SignIn onSwitchToSignUp={() => setAuthState(AuthState.SignUp)} />
      )}
    </div>
  );
};

export default Authentication;
