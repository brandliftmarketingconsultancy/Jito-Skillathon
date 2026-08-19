import { EVENT_NAME, EVENT_DATE_LABEL, EVENT_VENUE } from '../../config/event.js';
import NetworkArt from './NetworkArt.jsx';
import LottieAnimation from './LottieAnimation.jsx';
import aiNetwork from '../../assets/lottie/ai-network.json';

const LOGOS = [
  { src: '/1.png', alt: 'JITO', className: 'h-9 w-9 sm:h-10 sm:w-10' },
  { src: '/jito_balaghat_chapter.png', alt: 'JITO Balaghat Chapter', className: 'h-6 sm:h-7' },
  { src: '/jito_youth.png', alt: 'JITO Youth', className: 'h-6 sm:h-7' },
  { src: '/jito_center_for_excellence.png', alt: 'JITO Center for Excellence', className: 'h-7 sm:h-8' },
  { src: '/jito_grohair_title_sponsor.png', alt: 'Title Sponsor: Grohair by Rajesh Chandan', className: 'h-7 sm:h-8' },
];

export default function Hero() {
  return (
    <section className="relative px-6 pb-14 pt-28 text-center sm:pt-20">

      {/* AI Lottie — top right, mirrors the logo's top-left position */}
      <div className="pointer-events-none absolute right-4 top-4 z-10 h-14 w-14 sm:right-8 sm:top-6 sm:h-24 sm:w-24 lg:right-12 lg:top-8 lg:h-32 lg:w-32">
        <LottieAnimation
          animationData={aiNetwork}
          className="h-full w-full"
        />
      </div>

      <p className="label-eyebrow whitespace-nowrap text-[11px] tracking-[0.12em] sm:text-sm sm:tracking-widest">
  {EVENT_VENUE} &nbsp;|&nbsp; {EVENT_DATE_LABEL}
</p>

      {/* Logo strip — infinite carousel, between date and event name */}
      <div className="group relative mx-auto mt-4 max-w-2xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-3 sm:gap-4">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-3 sm:gap-4" aria-hidden={copy === 1}>
              {LOGOS.map((logo) => (
                <img
                  key={`${copy}-${logo.alt}`}
                  src={logo.src}
                  alt={logo.alt}
                  className={logo.className}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

        {/* Title sponsor callout — sits just below the carousel */}
    {/* Title sponsor callout — sits just below the carousel */}
<div className="mx-auto mt-5 flex w-fit flex-col items-center gap-2 sm:flex-row sm:gap-3">
  <span className="label-eyebrow text-bone-400">Platinum  Sponsor</span>
  <div className="h-px w-8 bg-bone-400/30 sm:h-8 sm:w-px" />
  <img
    src="/sponser.jpeg"
    alt="Title Sponsor: Grohair by Rajesh Chandan"
    className="h-11 sm:h-12"
  />
</div>

      <style>{`
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: hero-marquee 18s linear infinite;
        }
        .group:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>

      <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl uppercase leading-tight text-bone-100 sm:text-5xl">
        {EVENT_NAME}
      </h1>

      <p className="mt-3 font-body text-base text-bone-400">
        Where practical skills meet real-world impact
      </p>

      {/* Hero artwork */}
      <div className="card mx-auto mt-10 h-72 max-w-4xl overflow-hidden sm:h-96">
        <NetworkArt />
      </div>

    </section>
  );
}