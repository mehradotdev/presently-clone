import { Authenticated, Unauthenticated, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { SignInForm } from './SignInForm';
import { Toaster } from 'sonner';
import { GratitudeTimeline } from './components/GratitudeTimeline';
import { ThemeProvider } from './components/ThemeProvider';
import { UserDropdown } from './components/UserDropdown';
import { SettingsPage } from './components/SettingsPage';
import { useState } from 'react';

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
          <h1 className="text-2xl font-serif font-bold text-primary">Presently</h1>
          <div className="flex items-center gap-4">
            <Authenticated>
              <UserDropdown onSettingsClick={() => setShowSettings(true)} />
            </Authenticated>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto">
            <Content />
          </div>
        </main>
        <SettingsPage isOpen={showSettings} onClose={() => setShowSettings(false)} />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const userProfile = useQuery(api.users.getUserProfile);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getGreeting = () => {
    if (userProfile?.displayName) {
      return `Hi ${userProfile.displayName}, what are you grateful for today?`;
    }
    return 'Your Gratitude Journal';
  };

  return (
    <div className="flex flex-col gap-8">
      <Authenticated>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">
            {getGreeting()}
          </h2>
          <p className="text-muted-foreground">
            Reflect on the good things in your life, one day at a time.
          </p>
        </div>
        <GratitudeTimeline />
      </Authenticated>

      <Unauthenticated>
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Welcome to Presently
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Your daily gratitude journal for mindful reflection
          </p>
          <SignInForm />
        </div>
      </Unauthenticated>
    </div>
  );
}
