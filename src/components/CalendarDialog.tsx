import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { XIcon } from './icons/XIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface CalendarDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

export function CalendarDialog({ isOpen, onClose, onDateSelect }: CalendarDialogProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const logs = useQuery(api.gratitude.getGratitudeLogs) || [];

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Get today's date for comparison
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create a set of dates that have gratitude logs for quick lookup
  const datesWithLogs = new Set(
    logs
      .filter((log) => log.content.trim() !== '') // Only include non-empty logs
      .map((log) => log.date),
  );

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    // Check if the date is in the future
    if (isFutureDate(day)) {
      return; // Don't allow selection of future dates
    }

    // Create date string directly to avoid timezone issues
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateSelect(dateStr);
  };

  const isToday = (day: number) => {
    return todayYear === year && todayMonth === month && todayDate === day;
  };

  const isFutureDate = (day: number) => {
    // If it's a different year or month, compare those first
    if (year > todayYear) return true;
    if (year < todayYear) return false;
    if (month > todayMonth) return true;
    if (month < todayMonth) return false;

    // Same year and month, compare day
    return day > todayDate;
  };

  const hasGratitudeLog = (day: number) => {
    // Create date string directly to avoid timezone issues
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return datesWithLogs.has(dateStr);
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const todayClass = isToday(day);
      const hasLog = hasGratitudeLog(day);
      const isFuture = isFutureDate(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isFuture}
          className={`relative h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
            isFuture
              ? 'text-muted-foreground/40 cursor-not-allowed bg-muted/20'
              : todayClass
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'text-foreground hover:text-foreground hover:bg-muted'
          }`}
          aria-label={isFuture ? `${day} - Future date (disabled)` : `Select ${day}`}
          title={
            isFuture ? 'Future dates are not available for gratitude entries' : undefined
          }
        >
          {day}
          {/* Green dot indicator for dates with gratitude logs */}
          {hasLog && !isFuture && (
            <div
              className={`absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full ${
                todayClass ? 'bg-primary-foreground' : 'bg-[#4DB6AC]'
              }`}
              aria-hidden="true"
            />
          )}
        </button>,
      );
    }

    return days;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-serif font-semibold text-card-foreground">
            Select Date
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-card-foreground">
              {monthNames[month]} {year}
            </h3>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Next month"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="h-10 flex items-center justify-center text-xs font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4DB6AC]"></div>
              <span>Has entry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></div>
              <span>Future date</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
