import { TESTIMONIALS } from '../../config/event.js';
import Stars from './Stars.jsx';

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="card p-6 text-left">
            <Stars />
            <p className="mt-4 font-body text-bone-200">{t.quote}</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-ink-700" />
              <div>
                <p className="text-sm font-bold text-bone-100">{t.name}</p>
                <p className="text-xs text-bone-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}