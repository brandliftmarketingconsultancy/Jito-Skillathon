import Hero from '../components/landing/Hero.jsx';
import IntroStats from '../components/landing/IntroStats.jsx';
import About from '../components/landing/About.jsx';
import Testimonials from '../components/landing/Testimonials.jsx';
import Speakers from '../components/landing/Speakers.jsx';
import Agenda from '../components/landing/Agenda.jsx';
import RegisterSection from '../components/landing/RegisterSection.jsx';
import LandingFooter from '../components/landing/LandingFooter.jsx';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <IntroStats />
      <About />
      <Testimonials />
      <Speakers />
      <Agenda />
      <RegisterSection />
      <LandingFooter />
    </div>
  );
}