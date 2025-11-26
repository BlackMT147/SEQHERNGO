'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { AppUser, UserProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

const isFirstUser = async (): Promise<boolean> => {
    const usersCollection = collection(db, 'users');
    const userSnapshot = await getDocs(usersCollection);
    return userSnapshot.empty;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        
        // Listen for real-time updates to the user's profile
        const unsubSnapshot = onSnapshot(userRef, async (docSnap) => {
            if (docSnap.exists()) {
                // User profile exists, merge it with firebase user
                const userProfile = docSnap.data() as UserProfile;
                setUser({ ...firebaseUser, ...userProfile });
            } else {
                // New user, create a profile in Firestore
                const firstUser = await isFirstUser();
                const newUserProfile: UserProfile = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    role: firstUser ? 'admin' : 'user',
                };
                await setDoc(userRef, newUserProfile);
                setUser({ ...firebaseUser, ...newUserProfile });
            }
            setLoading(false);
        });

        return () => unsubSnapshot();

      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const isAdmin = user?.role === 'admin';

  if (loading) {
    return (
        <div className="w-full h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Skeleton className="h-8 w-24" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>
            </header>
            <div className="flex-grow container mx-auto p-4">
                <Skeleton className="h-64 w-full" />
                <div className="mt-8 grid md:grid-cols-3 gap-8">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
