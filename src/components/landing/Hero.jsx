import { EVENT_NAME, EVENT_DATE_LABEL, EVENT_VENUE } from '../../config/event.js';
import NetworkArt from './NetworkArt.jsx';

export default function Hero() {
  return (
    <section className="px-6 pt-16 pb-14 text-center">
      <p className="label-eyebrow">
        {EVENT_VENUE} &nbsp;|&nbsp; {EVENT_DATE_LABEL}
      </p>
      <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase leading-tight text-bone-100 sm:text-5xl">
        {EVENT_NAME}
      </h1>
      <p className="mt-3 font-body text-base text-bone-400">
        Where practical skills meet real-world impact
      </p>

      {/* hero artwork — TODO: swap for a real photo/illustration if you have one */}
      <div className="card mx-auto mt-10 h-72 max-w-4xl overflow-hidden sm:h-96">
        <NetworkArt />
      </div>
    </section>
  );
}