import Link from 'next/link'; // Import Link from next/link

export default function Home() {
  return (
    <div>
      {/* Updated the <a> tag with <Link> */}
      <Link href="/signup">
        <a>Sign Up</a> {/* Next.js Link automatically wraps the <a> */}
      </Link>
    </div>
  );
}
