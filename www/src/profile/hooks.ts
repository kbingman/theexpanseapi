import { useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

import { profileState } from './atoms';
// import {logger} from '../shared';

export const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const router = useRouter();

  const logout = () => {
    Auth.signOut();
    setProfile(null);
    router.push('/');
  }

  if (typeof window === 'undefined') {
    return [null, logout];
  }

  useLayoutEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { attributes } = await Auth.currentAuthenticatedUser();
        if (isMounted) {
          setProfile(attributes);
        }
      } catch (err) {
        // logger.error(err);
        if (isMounted) {
          setProfile(null);
        }
      }
    })();
    return () => { isMounted = false };
  }, [setProfile]);

  return [profile, logout];
};
