import { formatDate } from '../../lib/utils';

interface MilestoneItemProps {
  milestoneDay: number;
  date: string;
  isFirst: boolean;
  isLast: boolean;
}

export function MilestoneItem({
  milestoneDay,
  date,
  isFirst,
  isLast,
}: MilestoneItemProps) {
  return (
    <div className="relative group">
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

      {/* Special milestone dot - larger and golden */}
      <div className="absolute left-3 top-12 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-yellow-300 shadow-lg z-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse opacity-30"></div>
        {/* Star icon in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>

      {/* Milestone content card */}
      <div className="ml-16 pb-8">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg border-2 border-yellow-200 dark:border-yellow-800 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="p-6 text-center">
            {/* Milestone title */}
            <h3 className="text-2xl font-serif font-bold text-yellow-800 dark:text-yellow-200 mb-4">
              🎉 {milestoneDay} days of gratitude 🎉
            </h3>

            {/* Large heart icon */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <svg
                  className="w-16 h-16 text-red-500 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {/* Sparkle effects */}
                <div className="absolute -top-2 -right-2 text-yellow-400">
                  <svg
                    className="w-6 h-6 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -left-2 text-yellow-400 animation-delay-500">
                  <svg
                    className="w-4 h-4 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Congratulatory message */}
            <p className="text-yellow-700 dark:text-yellow-300 font-medium mb-2">
              Congratulations on reaching this milestone!
            </p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Achieved on {formatDate(date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
