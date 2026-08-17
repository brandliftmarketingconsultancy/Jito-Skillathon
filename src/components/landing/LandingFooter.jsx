import { EVENT_NAME, EVENT_DATE_LABEL, EVENT_VENUE } from '../../config/event.js';

export default function LandingFooter() {
  return (
    <footer className="border-t border-bone-100/10 px-6 py-8 text-center font-mono text-xs text-bone-600">
      {EVENT_NAME} &nbsp;·&nbsp; {EVENT_DATE_LABEL} &nbsp;·&nbsp; {EVENT_VENUE}
    </footer>
  );
}