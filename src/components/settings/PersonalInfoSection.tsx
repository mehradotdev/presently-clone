import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { toast } from 'sonner';

export function PersonalInfoSection() {
  const userProfile = useQuery(api.users.getUserProfile);
  const updateProfile = useMutation(api.users.updateUserProfile);
  const [displayName, setDisplayName] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || '');
      setProfilePictureUrl(userProfile.profilePictureUrl || '');
    }
  }, [userProfile]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        displayName: displayName.trim() || undefined,
        profilePictureUrl: profilePictureUrl.trim() || undefined,
      });
      toast.success('Profile updated!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-card-foreground mb-4">
        Personal Information
      </h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="display-name"
            className="block text-sm font-medium text-card-foreground mb-2"
          >
            Display Name
          </label>
          <input
            id="display-name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your name (optional)"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This will personalize your gratitude journal experience
          </p>
        </div>

        <div>
          <label
            htmlFor="profile-picture"
            className="block text-sm font-medium text-card-foreground mb-2"
          >
            Profile Picture URL
          </label>
          <input
            id="profile-picture"
            type="url"
            value={profilePictureUrl}
            onChange={(e) => setProfilePictureUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com/your-image.jpg (optional)"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter a URL to an image to use as your profile picture
          </p>

          {/* Preview */}
          {profilePictureUrl && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-2">Preview:</p>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border-2 border-border">
                <img
                  src={profilePictureUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'block';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
