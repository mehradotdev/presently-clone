import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { DownloadIcon } from '../icons/DownloadIcon';
import { UploadIcon } from '../icons/UploadIcon';
import { toast } from 'sonner';
import { validateCSVFormat, generateCSVContent, downloadCSV } from '../../lib/utils';
import { ImportConfirmationDialog } from './ImportConfirmationDialog';

export function BackupRestoreSection() {
  const gratitudeLogs = useQuery(api.gratitude.getGratitudeLogs) || [];
  const importEntries = useMutation(api.gratitude.importGratitudeEntries);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState('');
  const [showImportConfirmation, setShowImportConfirmation] = useState(false);
  const [pendingImportData, setPendingImportData] = useState<{
    entries: Array<{ date: string; content: string }>;
    fileName: string;
  } | null>(null);

  const exportToCSV = async () => {
    setIsExporting(true);
    try {
      const validEntries = gratitudeLogs.filter((log) => log.content.trim() !== '');

      if (validEntries.length === 0) {
        toast.error('No journal entries to export.');
        return;
      }

      const csvContent = generateCSVContent(validEntries);
      const filename = `gratitude-journal-${new Date().toISOString().split('T')[0]}.csv`;

      downloadCSV(csvContent, filename);
      toast.success(`Exported ${validEntries.length} journal entries to CSV!`);
    } catch (error) {
      toast.error('Failed to export entries. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset the input
    event.target.value = '';

    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast.error('Please select a CSV file.');
      return;
    }

    try {
      const csvContent = await file.text();
      const entries = validateCSVFormat(csvContent);

      setPendingImportData({
        entries,
        fileName: file.name,
      });
      setShowImportConfirmation(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to read CSV file.');
    }
  };

  const handleImportConfirm = async () => {
    if (!pendingImportData) return;

    setShowImportConfirmation(false);
    setIsImporting(true);
    setImportProgress('Preparing import...');

    try {
      const { entries } = pendingImportData;

      // Import entries in batches to avoid overwhelming the system
      const batchSize = 10;
      let imported = 0;

      for (let i = 0; i < entries.length; i += batchSize) {
        const batch = entries.slice(i, i + batchSize);
        setImportProgress(
          `Importing entries ${imported + 1}-${Math.min(imported + batchSize, entries.length)} of ${entries.length}...`,
        );

        await importEntries({ entries: batch });
        imported += batch.length;

        // Small delay to prevent overwhelming the system
        if (i + batchSize < entries.length) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      toast.success(`Successfully imported ${entries.length} journal entries!`);
    } catch (error) {
      toast.error('Failed to import entries. Please try again.');
    } finally {
      setIsImporting(false);
      setImportProgress('');
      setPendingImportData(null);
    }
  };

  const handleImportCancel = () => {
    setShowImportConfirmation(false);
    setPendingImportData(null);
  };

  const validEntriesCount = gratitudeLogs.filter(
    (log) => log.content.trim() !== '',
  ).length;

  return (
    <>
      <div>
        <h3 className="text-lg font-medium text-card-foreground mb-4">
          Backup & Restore
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-card-foreground font-medium mb-2">
              Export Your Data
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Download all your journal entries as a CSV file for backup or external use
            </p>
            <button
              onClick={exportToCSV}
              disabled={isExporting || validEntriesCount === 0}
              className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <DownloadIcon className="w-4 h-4" />
              {isExporting ? 'Exporting...' : 'Export Entries to CSV'}
            </button>
            {validEntriesCount === 0 ? (
              <p className="text-xs text-muted-foreground mt-2">
                No journal entries available to export
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">
                {validEntriesCount} entries available for export
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-card-foreground font-medium mb-2">
              Import Entries from Backup
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Upload a CSV file to restore your journal entries from a backup
            </p>
            <div className="relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                disabled={isImporting}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                id="import-file"
              />
              <button
                disabled={isImporting}
                className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <UploadIcon className="w-4 h-4" />
                {isImporting
                  ? importProgress || 'Importing...'
                  : 'Import Entries from CSV'}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              CSV format: entryDate,entryContent (matching export format)
            </p>
          </div>
        </div>
      </div>

      {/* Import Confirmation Dialog */}
      <ImportConfirmationDialog
        isOpen={showImportConfirmation}
        onClose={handleImportCancel}
        onConfirm={handleImportConfirm}
        fileName={pendingImportData?.fileName || ''}
        entryCount={pendingImportData?.entries.length || 0}
      />
    </>
  );
}
