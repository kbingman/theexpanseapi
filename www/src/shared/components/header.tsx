import NextLink from 'next/link';
import { H1 } from './elements';

const Link = ({ children, href }) => (
  <NextLink href={href} passHref>
    <a className="text-blue-900 hover:text-blue-700">{children}</a>
  </NextLink>
);

export const Header = () => (
  <header className="sticky top-0 p-1 text-gray-700 bg-gray-200">
    <H1>The Expanse API</H1>
    <nav className="p-1">
      <Link href="/">
        Episodes
      </Link>
      {' | '}
      <Link href="/spacecraft">
        Spacecraft
      </Link>
      {' | '}
      <Link href="/people">
        People
      </Link>
    </nav>
  </header>
);
