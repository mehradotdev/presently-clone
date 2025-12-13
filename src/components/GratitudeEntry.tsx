import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { XIcon } from './icons/XIcon';

interface GratitudeEntryProps {
  date: string;
  onClose: () => void;
}

export function GratitudeEntry({ date, onClose }: GratitudeEntryProps) {
  const existingLog = useQuery(api.gratitude.getGratitudeLogByDate, { date });
  const saveLog = useMutation(api.gratitude.saveGratitudeLog);
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (existingLog) {
      setContent(existingLog.content);
    } else {
      setContent('');
    }
  }, [existingLog]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveLog({ date, content });
      toast.success(content.trim() ? 'Gratitude saved!' : 'Entry cleared!');
      onClose();
    } catch (error) {
      toast.error('Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-serif font-semibold text-card-foreground">
            {formatDate(date)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <label
            htmlFor="gratitude-content"
            className="block text-sm font-medium text-card-foreground mb-3"
          >
            What are you grateful for?
          </label>
          <textarea
            id="gratitude-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Take a moment to reflect on the good things in your life..."
            className="w-full h-64 p-4 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            autoFocus
          />
          <p className="text-xs text-muted-foreground mt-2">
            Press Cmd/Ctrl + Enter to save, or Escape to close
          </p>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-muted/30">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
