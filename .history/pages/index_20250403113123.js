import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Firebase auth
import { useRouter } from 'next/router'; // To navigate programmatically

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign up and login
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/home'); // Redirect to home after sign-up
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/home'); // Redirect to home after login
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>{isSignUp ? 'Sign Up' : 'Log In'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        </form>
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}
