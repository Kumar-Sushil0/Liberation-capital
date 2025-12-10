// Utility function to create Google Calendar event link
export const createGoogleCalendarLink = (
  title: string,
  startDate: Date,
  endDate: Date,
  description?: string,
  location?: string,
  reminderMinutes?: number
): string => {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    ...(description && { details: description }),
    ...(location && { location: location })
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Function to create a Liberation Capital reminder link
export const createLiberationCapitalMeeting = (): string => {
  // Set reminder for next available time when user can focus (next day at a good time)
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);
  
  const startTime = new Date(nextDay);
  startTime.setHours(19, 0, 0, 0); // 7:00 PM - good time for focused exploration
  
  const endTime = new Date(startTime);
  endTime.setMinutes(startTime.getMinutes() + 15); // 15-minute reminder

  return createGoogleCalendarLink(
    'Reminder to explore Liberation Capital with open intent',
    startTime,
    endTime,
    'Personal reminder to return to Liberation Capital and explore the complete website experience. Set aside 15 uninterrupted minutes to dive deep into the philosophy and discover what Liberation Capital offers.\n\n⏰ IMPORTANT: Please set a 15-minute reminder for this event (instead of the default 30 minutes) to align with the focused 15-minute experience.\n\nVisit: [website URL]',
    'Your focused space - no distractions'
  );
};

// Helper function to get next business day
const getNextBusinessDay = (date: Date): Date => {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  
  // If it's Saturday (6) or Sunday (0), move to Monday
  const dayOfWeek = nextDay.getDay();
  if (dayOfWeek === 0) { // Sunday
    nextDay.setDate(nextDay.getDate() + 1);
  } else if (dayOfWeek === 6) { // Saturday
    nextDay.setDate(nextDay.getDate() + 2);
  }
  
  return nextDay;
};