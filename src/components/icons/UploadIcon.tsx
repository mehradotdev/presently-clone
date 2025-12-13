export function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-15"></path>
      <polyline points="17,6 12,1 7,6"></polyline>
      <line x1="12" y1="1" x2="12" y2="13"></line>
    </svg>
  );
}
