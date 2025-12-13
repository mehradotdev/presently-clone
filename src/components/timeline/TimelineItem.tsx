import { formatDate } from '../../lib/utils';

interface TimelineItemProps {
  date: string;
  content?: string;
  isEmpty: boolean;
  isToday?: boolean;
  isYesterday?: boolean;
  isFirst: boolean;
  isLast: boolean;
  onClick: () => void;
}

export function TimelineItem({
  date,
  content,
  isEmpty,
  isToday,
  isYesterday,
  isFirst,
  isLast,
  onClick,
}: TimelineItemProps) {
  const getPlaceholderText = () => {
    if (isToday) return 'What are you grateful for today?';
    if (isYesterday) return 'What were you grateful for yesterday?';
    return '';
  };

  const truncateContent = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      {/* Timeline track - extends from previous item to next item */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#B0B0B0]">
        {/* Hide the top portion for the first item */}
        {isFirst && (
          <div className="absolute top-0 left-0 right-0 h-12 bg-background"></div>
        )}
        {/* Hide the bottom portion for the last item */}
        {isLast && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-background"></div>
        )}
      </div>

      {/* Timeline dot positioned to align with title */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`absolute left-4 top-12 w-4 h-4 rounded-full border-2 transition-all duration-200 hover:scale-125 focus:scale-125 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 z-10 ${
          isEmpty
            ? 'bg-background border-[#B0B0B0] hover:border-[#4DB6AC] hover:bg-[#4DB6AC]/10'
            : 'bg-[#4DB6AC] border-[#4DB6AC] shadow-sm hover:shadow-md'
        }`}
        aria-label={`View entry for ${formatDate(date)}`}
      >
        {/* Pulse animation for today's empty entry */}
        {isToday && isEmpty && (
          <div className="absolute inset-0 rounded-full bg-[#4DB6AC] animate-ping opacity-20"></div>
        )}
      </button>

      {/* Content card */}
      <div className="ml-16 pb-8">
        <div className="bg-card rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 group-hover:border-[#4DB6AC]/30">
          <div className="p-6">
            <h3 className="text-lg font-serif font-semibold text-card-foreground mb-3">
              {formatDate(date)}
            </h3>

            {isEmpty ? (
              <p className="text-muted-foreground italic">{getPlaceholderText()}</p>
            ) : (
              <p className="text-card-foreground leading-relaxed">
                {truncateContent(content || '')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
