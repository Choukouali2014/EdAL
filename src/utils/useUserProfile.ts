
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; 
import { toast } from 'sonner';

interface UserProfile {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
}

export const useUserProfile = () => {
  const [user, loadingAuth, authError] = useAuthState(auth);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            setProfile(null);
            console.warn('No user profile found');
          }
        } catch (error) {
            toast.error(`user profile might not be found because: ${error}`);
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  return {
    user,
    profile,
    loading: loadingAuth || loadingProfile,
    error: authError,
  };
};
