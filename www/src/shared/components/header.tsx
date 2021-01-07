import NextLink from 'next/link';
import { useProfile } from '../../profile/hooks';
import { H1 } from './elements';

const Link = ({ children, href }) => (
  <NextLink href={href} passHref>
    <a className="text-blue-900 hover:text-blue-700">{children}</a>
  </NextLink>
);

export const Header = () => (
  <header className="sticky top-0 p-1 text-gray-700 bg-gray-200">
    <H1>The Expanse API</H1>
    <div className="grid grid-flow-col">
      <nav className="p-1">
        <Link href="/">Episodes</Link>
        {' | '}
        <Link href="/spacecraft">Spacecraft</Link>
        {' | '}
        <Link href="/people">People</Link>
      </nav>
      <Profile />
    </div>
  </header>
);

export const Profile = () => {
  const [profile, logout] = useProfile();

  return (
    <div className="px-2 py-1 justify-self-end">
      {profile ? (
        <button onClick={logout}>logout {profile.email}</button>
      ) : (
        <Link href="/profile">Login</Link>
      )}
    </div>
  );
};
