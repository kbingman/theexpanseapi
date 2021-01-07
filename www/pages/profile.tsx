// pages/profile.js
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useProfile } from '../src/profile/hooks';

function Profile() {
  const [profile, logout] = useProfile();

  return (
    <div>
      {profile && <h1>Welcome, {profile.email}</h1>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default withAuthenticator(Profile);
