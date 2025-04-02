import { useState } from 'react';
import { useRouter } from 'next/router';  // Import router for navigation
import { useAuth } from '../lib/auth'; // Import auth functions

const LoginComponent = () => {
  const { logIn } = useAuth(); // Get logIn function from useAuth
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [error, setError] = useState(''); // For capturing any login errors
  const router = useRouter(); // Next.js router for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password); // Call logIn with email & password
      router.push('/dashboard'); // Redirect to the dashboard or another page
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error: ', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p>{error}</p>} {/* Display error if there's one */}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginComponent;
