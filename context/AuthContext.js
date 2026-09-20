'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  googleProvider,
} from '@/lib/firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

const AuthContext = createContext({
  user: null,
  loading: true,
  showAuthModal: false,
  authModalMessage: '',
  openAuthModal: (message = '') => {},
  closeAuthModal: () => {},
  triggerProtectedAction: (actionCallback, message = '') => {},
  loginWithGoogle: async () => {},
  loginWithEmail: async (email, password) => {},
  signupWithEmail: async (email, password, name) => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser && pendingAction) {
        // Run pending action after successful login
        const action = pendingAction;
        setPendingAction(null);
        setShowAuthModal(false);
        try {
          action();
        } catch (err) {
          console.error('Failed to execute pending action post-login:', err);
        }
      }
    });

    return () => unsubscribe();
  }, [pendingAction]);

  const openAuthModal = (message = '') => {
    setAuthModalMessage(message);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setAuthModalMessage('');
  };

  const triggerProtectedAction = (actionCallback, message = 'Please log in or sign up to continue.') => {
    if (user) {
      actionCallback();
    } else {
      setPendingAction(() => actionCallback);
      openAuthModal(message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
      return res.user;
    } catch (error) {
      if (
        error?.code !== 'auth/popup-closed-by-user' &&
        error?.code !== 'auth/cancelled-popup-request'
      ) {
        console.error('Google Sign In Error:', error);
      }
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setShowAuthModal(false);
      return res.user;
    } catch (error) {
      console.error('Email Sign In Error:', error);
      throw error;
    }
  };

  const signupWithEmail = async (email, password, name) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (name && res.user) {
        await updateProfile(res.user, { displayName: name });
      }
      setShowAuthModal(false);
      return res.user;
    } catch (error) {
      console.error('Sign Up Error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        showAuthModal,
        authModalMessage,
        openAuthModal,
        closeAuthModal,
        triggerProtectedAction,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
