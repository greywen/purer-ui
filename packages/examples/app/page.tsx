import Link from "next/link";

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <Link href='/button'>Button</Link>
      <Link href='/input'>Input</Link>
    </main>
  );
}
