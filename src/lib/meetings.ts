import meetingsData from "@data/meetings.json";

export interface Meeting {
  id: string;
  /** The board/committee name */
  body: string;
  type: string;
  /** ISO date-time */
  dateTime: string;
  location: string;
  whatItIs: string;
  whyItMatters: string;
  howToComment: string;
  commentDeadline: string;
  agendaUrl: string;
}

interface MeetingsData {
  officialCalendarUrl: string;
  publicCommentEmail: string;
  meetings: Meeting[];
}

const data = meetingsData as MeetingsData;

/** Sorted soonest-first. */
export const meetings: Meeting[] = [...data.meetings].sort(
  (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
);

export const OFFICIAL_CALENDAR_URL = data.officialCalendarUrl;
export const PUBLIC_COMMENT_EMAIL = data.publicCommentEmail;

export function formatMeetingDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
