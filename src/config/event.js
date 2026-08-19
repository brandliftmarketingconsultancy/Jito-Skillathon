/* =========================================================================
   Event config — reads the same env vars as PaymentPage.jsx so every page
   agrees on name/venue/pricing. Set these in your .env:

     VITE_EVENT_NAME=JITO CFE Skillathon Xpress
     VITE_EVENT_DATE=November 14, 2026                (human-readable label)
     VITE_EVENT_DATETIME=2026-11-14T09:30:00+05:30     (ISO, drives countdown)
     VITE_EVENT_VENUE=TODO Venue, City
     VITE_PRICE_GENERAL=500
     VITE_PRICE_VIP=1000
     VITE_MAX_TICKETS=10
     VITE_SUPPORT_EMAIL=support@yourevent.com

   Content that isn't env-friendly (paragraphs, arrays) lives here as plain
   constants instead — edit directly, search "TODO".
   ========================================================================= */

export const EVENT_NAME = import.meta.env.VITE_EVENT_NAME || 'JITO CFE Skillathon Xpress';
export const EVENT_DATE_LABEL = import.meta.env.VITE_EVENT_DATE || 'TODO: set VITE_EVENT_DATE';
export const EVENT_DATETIME =
  import.meta.env.VITE_EVENT_DATETIME || import.meta.env.VITE_EVENT_DATE || null;
export const EVENT_VENUE = import.meta.env.VITE_EVENT_VENUE || 'TODO: set VITE_EVENT_VENUE';
export const PRICE_GENERAL = parseInt(import.meta.env.VITE_PRICE_GENERAL || '500', 10);
export const PRICE_VIP = parseInt(import.meta.env.VITE_PRICE_VIP || '1000', 10);
export const MAX_TICKETS = parseInt(import.meta.env.VITE_MAX_TICKETS || '10', 10);

// TODO: replace with your real description
export const ABOUT_TEXT =
  `${EVENT_NAME} CFE Skillathon Xpress is a one-day skill-building and networking experience featuring expert-led sessions on AI, business, communication, leadership, and personal growth—designed to help participants learn practical skills, build confidence, and stay future-ready.`;

// TODO: real quotes from attendees — leave empty to hide the section entirely
export const TESTIMONIALS = [
  // { quote: 'Great event!', name: 'Jane Doe', role: 'Attendee' },
];

// TODO: real facilitators, one per skill session
export const SPEAKERS = [
  {
    name: 'Shashi Jain Dugar',
    role: 'TED Speaker',
    bio: 'TED Speaker CorporateTrainer & Motivational Speaker',
    image: '/Shashi-jain .png',
  },
  {
    name: 'Ashesh D. Shah',
    role: 'AI Expert',
    bio: 'AI Leadership, Corporate Training & Strategy & Governance',
    image: '/ashesh-shah.png',
  },
];

export const AGENDA = [
  { time: '2:00 – 2:30 pm', label: 'Registration & Networking' },
  { time: '2:30 – 2:45 pm', label: 'Inaugural Ceremony' },
  { time: '2:45 – 3:30 pm', label: 'Lunch & Networking' },
  { time: '3:30 – 5:00 pm', label: 'Skill Session 1' },
  { time: '5:00 – 5:30 pm', label: 'Hi-Tea & Networking' },
  { time: '5:30 – 7:00 pm', label: 'Skill Session 2' },
  { time: '7:00 – 7:15 pm', label: 'Interactive Session & Networking' },
  { time: '7:15 – 7:45 pm', label: 'Vote of Thanks & Closing' },
  { time: '7:45 – 8:30 pm', label: 'Dinner & Networking' },
];

// TODO: confirm real perks per tier
export const TICKET_TIERS = [
  { key: 'General', price: PRICE_GENERAL, perks: 'Access to all 4 skill sessions, tea/coffee breaks & lunch' },
  { key: 'VIP', price: PRICE_VIP, perks: 'Everything in General, plus priority seating & certificate' },
];