import './globals.css';
import { ReduxProvider } from '@/store/ReduxProvider';
import { AuthProvider } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

export const metadata = {
  title: 'CVSnap — Don’t let an ugly resume cost you the interview',
  description:
    'Stand out with 15 premium, ATS-approved templates. Build your perfect CV in minutes. No formatting nightmares. No hidden subscriptions.',
  keywords: [
    'CVSnap',
    'CV builder',
    'Resume builder',
    'ATS friendly resume',
    '15 resume templates',
  ],
  authors: [{ name: 'CVSnap Studio' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased selection:bg-[#ff64d5] selection:text-white">
      <body className="min-h-full flex flex-col bg-[#fff4c2] text-black">
        <ReduxProvider>
          <AuthProvider>
            {children}
            <AuthModal />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

