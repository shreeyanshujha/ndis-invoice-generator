import dynamic from 'next/dynamic';

// Dynamically import LoginComponent with no SSR
const LoginComponent = dynamic(() => import('../components/LoginComponent'), { ssr: false });

export default function LoginPage() {
  return <LoginComponent />;
}
