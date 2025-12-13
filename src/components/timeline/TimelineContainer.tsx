import { useState } from 'react';
import { TimelineItem } from './TimelineItem';
import { MilestoneItem } from './MilestoneItem';
import { GratitudeEntry } from '../GratitudeEntry';
import { useTimelineData } from './useTimelineData';

export function TimelineContainer() {
  const { timelineEntries, isLoading } = useTimelineData();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleItemClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleCloseEntry = () => {
    setSelectedDate(null);
  };

  return (
    <>
      <div className="space-y-0">
        {timelineEntries.map((entry, index) => {
          const isFirst = index === 0;
          const isLast = index === timelineEntries.length - 1;

          if (entry.type === 'milestone') {
            return (
              <MilestoneItem
                key={`milestone-${entry.date}-${entry.milestoneDay}`}
                milestoneDay={entry.milestoneDay!}
                date={entry.date}
                isFirst={isFirst}
                isLast={isLast}
              />
            );
          }

          return (
            <TimelineItem
              key={entry.date}
              date={entry.date}
              content={entry.content}
              isEmpty={entry.isEmpty || false}
              isToday={entry.isToday}
              isYesterday={entry.isYesterday}
              isFirst={isFirst}
              isLast={isLast}
              onClick={() => handleItemClick(entry.date)}
            />
          );
        })}
      </div>

      {selectedDate && <GratitudeEntry date={selectedDate} onClose={handleCloseEntry} />}
    </>
  );
}
