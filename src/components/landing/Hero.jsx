import { EVENT_NAME, EVENT_DATE_LABEL, EVENT_VENUE } from '../../config/event.js';
import NetworkArt from './NetworkArt.jsx';
import LottieAnimation from './LottieAnimation.jsx';
import aiNetwork from '../../assets/lottie/ai-network.json';

export default function Hero() {
  return (
    <section className="relative px-6 pt-16 pb-14 text-center">

      {/* AI Lottie — top right */}
      <div className="pointer-events-none absolute right-4 top-4 z-10 h-24 w-24 sm:right-8 sm:top-6 sm:h-32 sm:w-32 lg:right-12 lg:top-8 lg:h-40 lg:w-40">
        <LottieAnimation
          animationData={aiNetwork}
          className="h-full w-full"
        />
      </div>

      <p className="label-eyebrow">
        {EVENT_VENUE} &nbsp;|&nbsp; {EVENT_DATE_LABEL}
      </p>

      <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase leading-tight text-bone-100 sm:text-5xl">
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