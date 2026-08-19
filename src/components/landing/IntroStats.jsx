import {
  EVENT_VENUE,
  EVENT_DATETIME,
  PRICE_GENERAL,
  PRICE_VIP,
} from '../../config/event.js';
import CountdownTimer from '../CountdownTimer.jsx';
import LottieAnimation from './LottieAnimation.jsx';
import ticketAnimation from '../../assets/lottie/ticket.json';

const STATS = [
  { value: '4', label: 'Skill Sessions' },
  { value: '1', label: 'Full Day' },
];

export default function IntroStats() {
  return (
    <section className="px-6 py-14">
      {/* Intro */}
      <p className="mx-auto max-w-2xl text-center font-body text-lg leading-relaxed text-bone-300">
        Join skilled professionals for a full day of hands-on learning and
        collaboration
        {EVENT_VENUE.startsWith('TODO') ? '.' : ` in ${EVENT_VENUE}.`}
      </p>

      {/* Event Stats */}
      <div className="mx-auto mt-8 flex max-w-lg items-center justify-center divide-x divide-bone-100/15">
        {STATS.map((s) => (
          <div key={s.label} className="px-10 first:pl-0 last:pr-0">
            <div className="font-display text-3xl font-bold text-bone-100 sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.15em] text-bone-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Ticket */}
      <div className="mx-auto mt-12 max-w-xl">
        <div className="relative -rotate-1 rounded-2xl border border-dashed border-bone-100/20 bg-bone-100/[0.03] transition-transform duration-300 hover:rotate-0">
          {/* Stub top: venue + countdown */}
          <div className="flex flex-col items-center gap-6 px-6 pb-8 pt-7 text-center sm:px-10">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-bone-500">
              {EVENT_VENUE.startsWith('TODO') ? 'Admit One' : EVENT_VENUE}
            </span>

            {EVENT_DATETIME && <CountdownTimer targetDate={EVENT_DATETIME} />}

            <p className="font-body text-sm text-bone-500">
              Both tickets include Hi-Tea followed by Dinner
            </p>
          </div>

          {/* Perforation with ticket-icon medallion */}
          <div className="relative border-t border-dashed border-bone-100/25">
            {/* edge notches — set to match your page background */}
            <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-stone-950" />
            <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-stone-950" />

            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-950">
              <LottieAnimation
                animationData={ticketAnimation}
                className="h-full w-full"
              />
            </div>
          </div>

          {/* Stub bottom: VIP led, General as the quiet alternative */}
          <div className="flex flex-col items-center gap-6 px-6 pb-7 pt-8 sm:px-10">
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
              {/* VIP — featured tier */}
              <div className="flex items-center gap-3 rounded-xl border border-orange-300/40 bg-orange-300/[0.06] px-5 py-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
                  Recommended
                </span>
                <span className="h-4 w-px bg-orange-300/30" />
                <span className="font-mono text-base text-bone-100">
                  VIP{' '}
                  <span className="text-lg font-bold tabular-nums text-orange-300">
                    ₹{PRICE_VIP}
                  </span>
                </span>
              </div>

              <a href="#register" className="btn-primary shrink-0">
                Register Now
              </a>
            </div>

            {/* General — quiet fallback */}
            <span className="font-mono text-xs text-bone-500">
              or General admission for{' '}
              <span className="text-bone-300">₹{PRICE_GENERAL}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}