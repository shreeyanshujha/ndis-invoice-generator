import dynamic from 'next/dynamic';

const AuthProvider = dynamic(() => import('../lib/AuthProvider'), { ssr: false });

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
