import RegisterForm from './RegisterForm.jsx';

export default function RegisterSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="label-eyebrow">Get your ticket</p>
        <h2 className="mt-2 font-display text-3xl uppercase text-bone-100 sm:text-4xl">Register now</h2>
      </div>
      <div className="mt-10">
        <RegisterForm />
      </div>
      <div className="mt-6 text-center">
  <p className="font-mono text-xs font-bold uppercase tracking-widest text-bone-500">
    For any queries — Call / WhatsApp
  </p>

  <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-sm">
    <a
      href="tel:9424922011"
      className="text-bone-300 transition-colors hover:text-orange-300"
    >
      9424922011
    </a>

    <span className="text-bone-600">•</span>

    <a
      href="tel:9425138845"
      className="text-bone-300 transition-colors hover:text-orange-300"
    >
      9425138845
    </a>
  </div>
</div>
    </section>
  );
}