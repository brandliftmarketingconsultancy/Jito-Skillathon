import { useEffect, useState } from 'react';

export default function FloatingRegisterButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const registerEl = document.getElementById('register');

    const handleScroll = () => {
      setVisible(true);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hide once the real register section is on screen —
    // no point floating a shortcut to something already visible.
    let observer;
    if (registerEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(false);
        },
        { threshold: 0.2 }
      );
      observer.observe(registerEl);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('register');
    if (!target) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <a
      href="#register"
      onClick={handleClick}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
   className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-bone-100/15 bg-[#2F6BFF] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-bone-100 shadow-lg shadow-black/30 backdrop-blur transition-all duration-300 hover:border-orange-300/40 hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 sm:px-6 sm:py-3.5 ${
  visible
    ? 'translate-y-0 opacity-100'
    : 'pointer-events-none translate-y-4 opacity-0'
}`}
    >
      Register
      <span aria-hidden="true">↓</span>
    </a>
  );
}