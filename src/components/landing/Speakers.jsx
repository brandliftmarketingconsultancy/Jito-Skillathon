import { SPEAKERS } from '../../config/event.js';

export default function Speakers() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="label-eyebrow">Trainer</p>

          <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-bone-100 sm:text-4xl md:text-5xl">
            Meet the Trainer
          </h2>

          <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-bone-400 sm:text-base">
            Learn from industry experts sharing practical insights, real-world experience, and strategies you can put into action.
          </p>
        </div>

        {/* Speakers */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {SPEAKERS.map((sp) => (
            <article
              key={sp.name + sp.role}
              className="group card relative overflow-hidden p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-ink-800/80 sm:p-8"
            >
              {/* Subtle glow */}
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl transition-opacity duration-300 group-hover:bg-blue-500/15" />

              {/* Avatar */}
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-bone-100/10 bg-ink-700">
                {sp.image ? (
                  <img
                    src={sp.image}
                    alt={sp.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-display text-2xl text-bone-300">
                    {sp.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="relative mt-6 font-body text-xl font-bold tracking-tight text-bone-100 sm:text-2xl">
                {sp.name}
              </h3>

              {/* Role */}
              <p className="relative mt-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                {sp.role}
              </p>

              {/* Divider */}
              <div className="mx-auto mt-5 h-px w-10 bg-blue-500/40 transition-all duration-300 group-hover:w-16" />

              {/* Bio */}
              <p className="relative mx-auto mt-5 max-w-md font-body text-sm leading-7 text-bone-400 sm:text-[15px]">
                {sp.bio}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}