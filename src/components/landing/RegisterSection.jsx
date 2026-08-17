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
      <p className="mt-6 text-center font-mono text-xs text-bone-600">
        <a href="/retrieve-ticket" className="underline">Already registered? Retrieve your ticket</a>
      </p>
    </section>
  );
}