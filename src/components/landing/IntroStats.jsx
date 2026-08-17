import { EVENT_VENUE, EVENT_DATETIME, PRICE_GENERAL } from '../../config/event.js';
import CountdownTimer from '../CountdownTimer.jsx';

const STATS = [
  { value: '4', label: 'Skill Sessions' },
  { value: '1', label: 'Full Day' },
  { value: `₹${PRICE_GENERAL}+`, label: 'Starting from' },
];

export default function IntroStats() {
  return (
    <section className="px-6 py-14 text-center">
      <p className="mx-auto max-w-xl font-body text-lg text-bone-300">
        Join skilled professionals for a full day of hands-on learning and collaboration
        {EVENT_VENUE.startsWith('TODO') ? '.' : ` in ${EVENT_VENUE}.`}
      </p>

      <div className="mx-auto mt-10 flex max-w-lg items-center justify-center divide-x divide-bone-100/15">
        {STATS.map((s) => (
          <div key={s.label} className="px-6 first:pl-0 last:pr-0">
            <div className="font-display text-3xl font-bold text-bone-100">{s.value}</div>
            <div className="mt-1 font-mono text-xs font-bold uppercase tracking-wide text-bone-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {EVENT_DATETIME && (
        <div className="mt-10 flex justify-center">
          <CountdownTimer targetDate={EVENT_DATETIME} />
        </div>
      )}

      <a href="#register" className="btn-primary mt-8 inline-block">
        Register now
      </a>
    </section>
  );
}