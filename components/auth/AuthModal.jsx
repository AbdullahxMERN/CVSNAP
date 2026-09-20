'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Zap, Lock, AlertTriangle, LogOut, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const {
    user,
    showAuthModal,
    closeAuthModal,
    authModalMessage,
    loginWithGoogle,
    logout,
  } = useAuth();

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showAuthModal) return null;

  const handleGoogleSignIn = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      if (
        err?.code !== 'auth/popup-closed-by-user' &&
        err?.code !== 'auth/cancelled-popup-request'
      ) {
        console.error('Google Auth Error:', err);
      }

      if (err?.code === 'auth/configuration-not-found') {
        setError(
          'Google Authentication is not enabled in your Firebase Console yet. Please go to Firebase Console -> Authentication -> Sign-in method and enable "Google".'
        );
      } else if (
        err?.code !== 'auth/popup-closed-by-user' &&
        err?.code !== 'auth/cancelled-popup-request'
      ) {
        setError(err.message || 'Google sign in failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeAuthModal();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in select-none">
      
      {/* Neo-Brutalist Modal Box */}
      <div className="w-full max-w-md bg-[#fff4c2] border-[3px] border-black rounded-3xl p-6 sm:p-8 relative shadow-[8px_8px_0px_#000] space-y-6 overflow-hidden">
        
        {/* Top Decorative Color Stripe */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#ffd905] via-[#ff64d5] to-[#48A4FF] border-b-2 border-black" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white border-2 border-black text-black hover:bg-[#ff0522] hover:text-white flex items-center justify-center transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none z-20 cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-[#ffd905] border-2 border-black shadow-[3px_3px_0px_#000] mx-auto flex items-center justify-center rotate-3">
            <Zap className="w-8 h-8 text-black fill-current" />
          </div>

          <h2 className="font-bebas text-3xl sm:text-4xl font-black text-black tracking-wider uppercase leading-none pt-2">
            {user ? 'YOUR ACCOUNT' : 'LOG IN TO CVSNAP'}
          </h2>
          
          <p className="font-sans text-xs sm:text-sm font-bold text-black/80 max-w-xs mx-auto">
            {user
              ? 'You are signed in and ready to download your ATS-approved resumes.'
              : 'Sign in with 1-click Google Auth to save and download your high-resolution CV.'}
          </p>
        </div>

        {/* Custom Message Alert (e.g. download interception prompt) */}
        {authModalMessage && !user && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#ff64d5]/15 border-2 border-black text-black text-xs font-black shadow-[2px_2px_0px_#000]">
            <Lock className="w-4 h-4 shrink-0 text-[#ff64d5]" />
            <span>{authModalMessage}</span>
          </div>
        )}

        {/* Firebase Error Callout */}
        {error && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#ff0522]/10 border-2 border-[#ff0522] text-black text-xs font-bold shadow-[2px_2px_0px_#000]">
            <AlertTriangle className="w-5 h-5 text-[#ff0522] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-black block uppercase text-[11px] text-[#ff0522]">Authentication Notice</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* AUTH CONTENT */}
        {user ? (
          /* User Profile View */
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-12 h-12 rounded-full border-2 border-black"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#2dd4bf] border-2 border-black flex items-center justify-center font-bebas text-xl font-bold text-black">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-black font-bebas text-lg text-black truncate">
                    {user.displayName || 'CVSnap User'}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
                </div>
                <p className="text-xs font-mono-tech text-black/70 truncate">{user.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-2xl bg-white border-2 border-black text-black font-bebas text-base tracking-wider hover:bg-[#ff0522] hover:text-white transition-all flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>LOG OUT OF ACCOUNT</span>
            </button>
          </div>
        ) : (
          /* 1-Click Google Sign-In View ONLY */
          <div className="space-y-4 pt-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#ffd905] hover:bg-[#ff64d5] hover:text-white text-black font-bebas text-lg tracking-widest transition-all flex items-center justify-center gap-3 border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#000]">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <span>{isSubmitting ? 'CONNECTING...' : 'CONTINUE WITH GOOGLE'}</span>
            </button>

            <p className="text-[11px] font-mono-tech text-center font-bold text-black/60 pt-2">
              🔒 Fast & Secure 1-Click Authentication. No password required.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
