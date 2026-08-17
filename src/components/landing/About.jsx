import { useEffect, useState } from 'react';
import { ABOUT_TEXT } from '../../config/event.js';

const ABOUT_IMAGES = [
  'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1626125345510-4603468eedfb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1715610258704-e8f9f5710fe0?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export default function About() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="label-eyebrow">About</p>

          <h2 className="mt-2 font-display text-3xl uppercase text-bone-100 sm:text-4xl">
            About the event
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-body leading-relaxed text-bone-400">
            {ABOUT_TEXT}
          </p>
        </div>

        {/* Image Carousel */}
        <div className="relative mt-12">

          <div className="relative h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-ink-800 sm:h-[360px] md:h-[460px] lg:h-[520px]">
            {ABOUT_IMAGES.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Event experience ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-1000 ${
                  active === index
                    ? 'scale-100 opacity-100'
                    : 'scale-[1.03] opacity-0'
                }`}
              />

            ))}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-ink-950/10" />

            {/* Navigation */}
            <div className="absolute bottom-5 right-5 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setActive(
                    (prev) =>
                      (prev - 1 + ABOUT_IMAGES.length) %
                      ABOUT_IMAGES.length
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink-950/70 text-white backdrop-blur-md transition hover:bg-blue-500"
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() =>
                  setActive(
                    (prev) => (prev + 1) % ABOUT_IMAGES.length
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink-950/70 text-white backdrop-blur-md transition hover:bg-blue-500"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-5 flex justify-center gap-2">
            {ABOUT_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === index
                    ? 'w-8 bg-blue-500'
                    : 'w-2 bg-bone-100/25'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}