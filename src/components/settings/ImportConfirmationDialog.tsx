interface ImportConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fileName: string;
  entryCount: number;
}

export function ImportConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  fileName, 
  entryCount 
}: ImportConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Are you sure you want to import?
          </h3>
          <div className="space-y-3 mb-6">
            <p className="text-sm text-card-foreground">
              <strong>File:</strong> {fileName}
            </p>
            <p className="text-sm text-card-foreground">
              <strong>Entries to import:</strong> {entryCount}
            </p>
            <p className="text-sm text-muted-foreground">
              Imported data could overwrite existing entries for matching dates.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
