import { EVENT_DATE_LABEL, EVENT_VENUE, AGENDA } from '../../config/event.js';

export default function Agenda() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="label-eyebrow">Schedule</p>
        <h2 className="mt-2 font-display text-3xl uppercase text-bone-100 sm:text-4xl">Agenda</h2>
        <p className="mt-3 font-body text-bone-500">
          {EVENT_DATE_LABEL} &nbsp;·&nbsp; {EVENT_VENUE}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl items-center gap-8 sm:grid-cols-2">
        <div className="card relative h-72 overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Day 1 event"
    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
  />

  {/* Navy overlay */}
  {/* <div className="absolute inset-0 bg-[#0B142F]/35" /> */}

  {/* Bottom gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#070D20] via-[#0B142F]/30 to-transparent" />

  <div className="relative z-10 flex h-full flex-col justify-end p-6">
    {/* <span className="font-display text-6xl font-black leading-none text-white">
      DAY 1
    </span> */}

    <span className="mt-2 font-mono text-sm font-bold uppercase tracking-wide text-blue-400">
      {EVENT_DATE_LABEL}
    </span>
  </div>
</div>

        <div className="text-left">
          <p className="font-body text-sm italic text-bone-500">Day 1</p>
          <p className="mt-1 font-display text-2xl uppercase text-bone-100">{EVENT_DATE_LABEL}</p>
          <hr className="mt-4 border-bone-100/15" />
          <ul className="mt-5 space-y-3">
            {AGENDA.map((item) => (
              <li key={item.time} className="flex gap-2 font-body text-bone-400">
                <span className="text-bone-600">•</span>
                <span>
                  <span className="font-semibold text-bone-100">{item.time}:</span> {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}