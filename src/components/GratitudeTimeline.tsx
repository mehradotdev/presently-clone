import { useState } from 'react';
import { GratitudeEntry } from './GratitudeEntry';
import { CalendarDialog } from './CalendarDialog';
import { TimelineContainer } from './timeline/TimelineContainer';
import { FloatingCalendarButton } from './timeline/FloatingCalendarButton';

export function GratitudeTimeline() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <TimelineContainer />

      <FloatingCalendarButton onClick={() => setShowCalendar(true)} />

      {/* Calendar Dialog */}
      <CalendarDialog
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={handleDateSelect}
      />

      {/* Gratitude Entry Dialog */}
      {selectedDate && (
        <GratitudeEntry date={selectedDate} onClose={() => setSelectedDate(null)} />
      )}
    </div>
  );
}
