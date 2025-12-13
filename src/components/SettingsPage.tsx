import { XIcon } from "./icons/XIcon";
import { PersonalInfoSection } from "./settings/PersonalInfoSection";
import { AppearanceSection } from "./settings/AppearanceSection";
import { BackupRestoreSection } from "./settings/BackupRestoreSection";

interface SettingsPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPage({ isOpen, onClose }: SettingsPageProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-serif font-semibold text-card-foreground">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Close settings"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <PersonalInfoSection />
          <AppearanceSection />
          <BackupRestoreSection />
        </div>
      </div>
    </div>
  );
}
