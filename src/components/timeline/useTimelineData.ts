import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export interface TimelineEntry {
  type: 'gratitude' | 'milestone';
  date: string;
  content?: string;
  isEmpty?: boolean;
  isToday?: boolean;
  isYesterday?: boolean;
  milestoneDay?: number;
}

export function useTimelineData() {
  const gratitudeLogs = useQuery(api.gratitude.getGratitudeLogs) || [];

  // Calculate milestone days: 5, 10, 25, then every 25 days thereafter (50, 75, 100, etc.)
  const calculateMilestones = (totalDays: number): number[] => {
    const milestones: number[] = [];

    if (totalDays >= 5) milestones.push(5);
    if (totalDays >= 10) milestones.push(10);

    // Every 25 days starting from 25 (25, 50, 75, 100, etc.)
    for (let i = 25; i <= totalDays; i += 25) {
      milestones.push(i);
    }

    return milestones;
  };

  // Create timeline entries
  const createTimelineEntries = (): TimelineEntry[] => {
    const entries: TimelineEntry[] = [];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Create date strings directly to avoid timezone issues (same logic as CalendarDialog)
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    // Create a map of existing gratitude logs by date
    const logsByDate = new Map(gratitudeLogs.map((log) => [log.date, log.content]));

    // Get all milestone days based on total logs
    const totalLoggedDays = gratitudeLogs.length;
    const milestones = calculateMilestones(totalLoggedDays);

    // Sort gratitude logs by date (ascending) for milestone calculation
    const sortedLogs = [...gratitudeLogs].sort((a, b) => a.date.localeCompare(b.date));

    // Get all dates that should be shown: dates with content + today + yesterday
    const allDates = new Set<string>();

    // Add all dates with actual entries
    gratitudeLogs.forEach((log) => allDates.add(log.date));

    // Always add today and yesterday
    allDates.add(todayStr);
    allDates.add(yesterdayStr);

    // Convert to array and sort in descending order (most recent first)
    const sortedDates = Array.from(allDates).sort((a, b) => b.localeCompare(a));

    // Process each date
    for (const dateStr of sortedDates) {
      const content = logsByDate.get(dateStr);
      const isEmpty = !content;
      const isToday = dateStr === todayStr;
      const isYesterday = dateStr === yesterdayStr;

      // Add gratitude entry
      entries.push({
        type: 'gratitude',
        date: dateStr,
        content,
        isEmpty,
        isToday,
        isYesterday,
      });

      // Check if this date represents a milestone achievement
      const milestoneToShow = milestones.find((milestone) => {
        if (sortedLogs.length >= milestone) {
          const milestoneDate = sortedLogs[milestone - 1].date;
          return milestoneDate === dateStr;
        }
        return false;
      });

      if (milestoneToShow) {
        entries.push({
          type: 'milestone',
          date: dateStr,
          milestoneDay: milestoneToShow,
        });
      }
    }

    return entries;
  };

  const timelineEntries = createTimelineEntries();

  return {
    timelineEntries,
    totalLoggedDays: gratitudeLogs.length,
    isLoading: gratitudeLogs === undefined,
  };
}
