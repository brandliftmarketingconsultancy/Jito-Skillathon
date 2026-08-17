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
    role: 'Skill Session 1',
    bio: 'Discover how communication, confidence and executive presence can transform the way you are perceived and remembered. The session will focus on practical techniques for stronger communication, body language, professional presence and leadership—helping participants become more confident and impactful in professional situations.',
    image: '/public/Shashi-jain .png',
  },
  {
    name: 'Ashesh D. Shah',
    role: 'Skill Session 2',
    bio: 'Explore how AI can move beyond experimentation and become a practical tool for productivity, decision-making and business growth. Participants will discover real-world AI use cases, understand responsible AI adoption, and learn how to identify opportunities where AI can create measurable impact.',
    image: '/public/ashesh-shah.png',
  },
];

export const AGENDA = [
  { time: '9:30 am', label: 'Registration & Networking' },
  { time: '10:00 am', label: 'Inaugural Ceremony' },
  { time: '10:30 am – 12:00 pm', label: 'Skill Session 1' },
  { time: '12:00 – 12:15 pm', label: 'Tea / Coffee Break' },
  { time: '12:15 – 1:45 pm', label: 'Skill Session 2' },
  { time: '1:45 – 2:30 pm', label: 'Lunch' },
  { time: '2:30 – 4:00 pm', label: 'Skill Session 3' },
  { time: '4:00 – 4:15 pm', label: 'Tea / Coffee Break' },
  { time: '4:15 – 5:45 pm', label: 'Skill Session 4' },
  { time: '5:45 – 6:00 pm', label: 'Vote of Thanks & Closing' },
];

// TODO: confirm real perks per tier
export const TICKET_TIERS = [
  { key: 'General', price: PRICE_GENERAL, perks: 'Access to all 4 skill sessions, tea/coffee breaks & lunch' },
  { key: 'VIP', price: PRICE_VIP, perks: 'Everything in General, plus priority seating & certificate' },
];