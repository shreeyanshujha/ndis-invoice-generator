import dynamic from 'next/dynamic';

// Dynamically import the Login component, disabling SSR
const LoginComponent = dynamic(() => import('../components/LoginComponent'), { ssr: false });

export default function LoginPage() {
  return <LoginComponent />;
}
