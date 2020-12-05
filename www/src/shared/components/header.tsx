import Link from 'next/link';

export const Header = () => (
  <header>
    <h1>The Expanse</h1>
    <Link href="/">Spacecraft</Link>
    {' | '}
    <Link href="/episodes">Episodes</Link>
    {' | '}
    <Link href="/people">People</Link>
  </header>
);
