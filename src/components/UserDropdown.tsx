import { useState, useRef, useEffect } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserIcon } from './icons/UserIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { LogOutIcon } from './icons/LogOutIcon';

interface UserDropdownProps {
  onSettingsClick: () => void;
}

export function UserDropdown({ onSettingsClick }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { signOut } = useAuthActions();
  const userProfile = useQuery(api.users.getUserProfile);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Reset image error when profile picture URL changes
  useEffect(() => {
    setImageError(false);
  }, [userProfile?.profilePictureUrl]);

  const handleSettingsClick = () => {
    setIsOpen(false);
    onSettingsClick();
  };

  const handleSignOut = () => {
    setIsOpen(false);
    void signOut();
  };

  const hasValidProfilePicture = userProfile?.profilePictureUrl && !imageError;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 overflow-hidden"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {hasValidProfilePicture ? (
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-border hover:border-primary/50 transition-colors">
            <img
              src={userProfile.profilePictureUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={handleSettingsClick}
              className="w-full px-4 py-2 text-left text-sm text-card-foreground hover:bg-muted transition-colors flex items-center gap-3"
            >
              <SettingsIcon className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-card-foreground hover:bg-muted transition-colors flex items-center gap-3"
            >
              <LogOutIcon className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
