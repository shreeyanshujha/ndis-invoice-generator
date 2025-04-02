import dynamic from 'next/dynamic';

// Dynamically import the Success component, disabling SSR
const SuccessComponent = dynamic(() => import('../components/SuccessComponent'), { ssr: false });

export default function SuccessPage() {
  return <SuccessComponent />;
}
