import { CalendarIcon } from '../icons/CalendarIcon';

interface FloatingCalendarButtonProps {
  onClick: () => void;
}

export function FloatingCalendarButton({ onClick }: FloatingCalendarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      aria-label="Open calendar"
    >
      <CalendarIcon className="w-6 h-6" />
    </button>
  );
}
