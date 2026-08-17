import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitUpiPayment, ApiError } from '../lib/api.js';
import paymentQR from '../assets/paymentQR.jpeg';

const EVENT_NAME =
  import.meta.env.VITE_EVENT_NAME || 'Balaghat Event';

const UPI_ID =
  (import.meta.env.VITE_UPI_ID || 'organizer@upi').trim();

const UPI_PAYEE_NAME =
  import.meta.env.VITE_UPI_PAYEE_NAME || EVENT_NAME;

/* ============================================================
   COPY BUTTON
============================================================ */

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="
        shrink-0
        rounded-lg
        border border-white/10
        bg-white/[0.04]
        px-3 py-2
        font-mono text-[9px]
        font-bold uppercase tracking-wider
        text-slate-400
        transition-all duration-200
        hover:border-[#60A5FA]/30
        hover:bg-[#2563EB]/10
        hover:text-[#60A5FA]
        active:scale-95
      "
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ============================================================
   SMALL LABEL
============================================================ */

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#60A5FA]">
      {children}
    </p>
  );
}

/* ============================================================
   PAYMENT PAGE
============================================================ */

export default function PaymentPage() {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [upiTxnId, setUpiTxnId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /* ==========================================================
     LOAD PENDING BOOKING
  ========================================================== */

  useEffect(() => {
    try {
      const saved = JSON.parse(
        sessionStorage.getItem('pending_booking') || 'null'
      );

      if (!saved) {
        navigate('/');
        return;
      }

      const pricePerTicket =
        saved.ticketType === 'VIP'
          ? parseInt(
              import.meta.env.VITE_PRICE_VIP || '1000',
              10
            )
          : parseInt(
              import.meta.env.VITE_PRICE_GENERAL || '500',
              10
            );

      const totalAmount =
        pricePerTicket * Number(saved.quantity || 0);

      setOrder({
        ...saved,
        pricePerTicket,
        totalAmount,
      });
    } catch {
      navigate('/');
    }
  }, [navigate]);

  /* ==========================================================
     SUBMIT PAYMENT
  ========================================================== */

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');

    const cleanUpiTxnId = upiTxnId.trim();

    if (!/^\d{12}$/.test(cleanUpiTxnId)) {
      setError(
        'Please enter the valid 12-digit UPI Transaction ID / UTR.'
      );
      return;
    }

    setLoading(true);

    try {
      await submitUpiPayment({
        name: order.name,
        email: order.email,
        phone: order.phone,
        city: order.city || '',
        ticketType: order.ticketType,
        quantity: order.quantity,
        upiTransactionId: cleanUpiTxnId,
      });

      sessionStorage.removeItem('pending_booking');

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to submit payment details. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  if (!order) {
    return null;
  }

  /* ============================================================
     SUCCESS SCREEN
  ============================================================ */

  if (success) {
    return (
      <main className="min-h-screen bg-[#0B142F] px-4 py-6 text-white sm:px-6 sm:py-10">

        <div className="mx-auto flex min-h-[85vh] max-w-xl items-center">

          <div className="w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111D3D] shadow-2xl shadow-black/30">

            <div className="h-1 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#F59E0B]" />

            <div className="px-5 py-9 text-center sm:p-12">

              {/* Success mark */}

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/10">

                <span className="text-2xl text-[#4ADE80]">
                  ✓
                </span>

              </div>

              <SectionLabel>
                Payment Submitted
              </SectionLabel>

              <h1 className="mt-3 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
                You're Almost There
              </h1>

              <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-slate-400">
                Your payment reference has been received and is
                awaiting verification. Your ticket will be sent
                to your registered email within 24 hours of confirmation.
              </p>

              {/* Summary */}

              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0B142F] text-left">

                <div className="border-b border-white/10 px-4 py-3">

                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Payment details
                  </p>

                </div>

                <div className="divide-y divide-white/10">

                  <div className="flex items-start justify-between gap-4 px-4 py-4">

                    <span className="text-xs text-slate-500">
                      Transaction
                    </span>

                    <span className="max-w-[65%] break-all text-right font-mono text-[10px] text-slate-200">
                      {upiTxnId}
                    </span>

                  </div>

                  <div className="flex items-start justify-between gap-4 px-4 py-4">

                    <span className="text-xs text-slate-500">
                      Email
                    </span>

                    <span className="max-w-[65%] break-all text-right font-mono text-[10px] text-slate-300">
                      {order.email}
                    </span>

                  </div>

                  <div className="flex items-center justify-between px-4 py-4">

                    <span className="text-xs font-medium text-slate-400">
                      Amount paid
                    </span>

                    <span className="font-display text-2xl text-[#F59E0B]">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="
                  mt-7
                  w-full
                  rounded-xl
                  bg-[#2563EB]
                  px-5 py-4
                  font-body text-sm font-bold
                  text-white
                  shadow-lg shadow-blue-950/30
                  transition-all
                  hover:bg-[#3B82F6]
                  active:scale-[0.99]
                  sm:w-auto
                  sm:min-w-[220px]
                "
              >
                Return to Event
              </button>

            </div>
          </div>

        </div>

      </main>
    );
  }

  /* ============================================================
     MAIN PAYMENT PAGE
  ============================================================ */

  return (
    <main className="min-h-screen bg-[#0B142F] text-white">

      {/* ========================================================
          TOP ACCENT
      ======================================================== */}

      <div className="h-1 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#F59E0B]" />

      <div className="mx-auto max-w-6xl px-4 pb-10 pt-5 sm:px-6 sm:pb-16 sm:pt-8">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <header className="mb-6 sm:mb-10">

          <button
            type="button"
            onClick={() => navigate('/')}
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              font-mono
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-slate-600
              transition
              hover:text-[#60A5FA]
            "
          >
            ← Back to registration
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />

                <SectionLabel>
                  Secure checkout
                </SectionLabel>

              </div>

              <h1 className="mt-3 max-w-xl font-display text-[2.7rem] uppercase leading-[0.9] tracking-wide text-white sm:text-5xl lg:text-6xl">
                Complete
                <br />
                Your Payment
              </h1>

              <p className="mt-4 max-w-lg text-xs leading-5 text-slate-400 sm:text-sm">
                Scan the QR code, complete your payment, and
                confirm your transaction below.
              </p>

            </div>

            {/* Desktop event identifier */}

            <div className="hidden text-right sm:block">

              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-700">
                Event
              </p>

              <p className="mt-1 max-w-[220px] text-sm font-semibold text-slate-400">
                {EVENT_NAME}
              </p>

            </div>

          </div>

        </header>

        {/* ======================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:gap-6">

          {/* ====================================================
              LEFT / PRIMARY PAYMENT CARD
          ==================================================== */}

          <section className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111D3D] shadow-2xl shadow-black/10">

            {/* Decorative background glow */}

            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#F59E0B]/5 blur-3xl" />

            <div className="relative p-5 sm:p-8 lg:p-10">

              {/* Payment card heading */}

              <div className="flex items-start justify-between">

                <div>

                  <SectionLabel>
                    Payment
                  </SectionLabel>

                  <h2 className="mt-2 font-display text-3xl uppercase leading-none text-white sm:text-4xl">
                    Scan & Pay
                  </h2>

                </div>

                <div className="rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-3 py-1.5">

                  <span className="flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase tracking-wider text-[#4ADE80]">

                    <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />

                    Secure

                  </span>

                </div>

              </div>

              {/* =================================================
                  PAYMENT HERO
              ================================================= */}

              <div className="mt-7 grid items-center gap-6 md:grid-cols-[minmax(230px,320px)_1fr] md:gap-8">

                {/* QR */}

                <div>

                  <div className="mx-auto max-w-[300px] rounded-[1.4rem] bg-white p-3 shadow-2xl shadow-black/30 sm:max-w-[320px] sm:p-4">

                    <div className="overflow-hidden rounded-xl">

                      <img
                        src={paymentQR}
                        alt="UPI payment QR code"
                        className="aspect-square w-full object-contain"
                      />

                    </div>

                  </div>

                  <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">
                    Scan with any UPI application
                  </p>

                </div>

                {/* Payment info */}

                <div className="space-y-3">

                  {/* Amount */}

                  <div className="rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/[0.06] p-5">

                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#FBBF24]/70">
                      Amount to pay
                    </p>

                    <div className="mt-1 flex items-end justify-between gap-3">

                      <span className="font-display text-4xl leading-none text-[#F59E0B] sm:text-5xl">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>

                      <span className="pb-1 font-mono text-[8px] uppercase text-slate-600">
                        INR
                      </span>

                    </div>

                  </div>

                  {/* UPI */}

                  <div className="rounded-2xl border border-white/10 bg-[#0B142F] p-4">

                    <div className="flex items-center justify-between gap-3">

                      <div className="min-w-0">

                        <p className="font-mono text-[8px] uppercase tracking-wider text-slate-600">
                          Pay to
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-slate-200">
                          {UPI_PAYEE_NAME}
                        </p>

                        <p className="mt-1 truncate font-mono text-[10px] text-slate-500">
                          {UPI_ID}
                        </p>

                      </div>

                      <CopyButton text={UPI_ID} />

                    </div>

                  </div>

                  {/* Important instruction */}

                  <div className="flex gap-3 rounded-2xl border border-[#2563EB]/15 bg-[#2563EB]/[0.05] p-4">

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/15 font-display text-sm text-[#60A5FA]">
                      i
                    </div>

                    <p className="text-[11px] leading-5 text-slate-400">
                      Complete the payment for the exact amount shown
                      above, then keep your UPI transaction reference
                      ready.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ====================================================
              RIGHT COLUMN
          ==================================================== */}

          <div className="flex flex-col gap-4">

            {/* ==================================================
                REGISTRATION SUMMARY
            ================================================== */}

            <section className="rounded-[1.75rem] border border-white/10 bg-[#111D3D] p-5 sm:p-7">

              <div className="flex items-start justify-between">

                <div>

                  <SectionLabel>
                    Registration
                  </SectionLabel>

                  <h2 className="mt-2 font-display text-3xl uppercase leading-none text-white">
                    Your Details
                  </h2>

                </div>

                <span className="rounded-lg border border-[#60A5FA]/15 bg-[#2563EB]/10 px-2.5 py-1.5 font-mono text-[8px] font-bold uppercase tracking-wider text-[#60A5FA]">
                  {order.ticketType}
                </span>

              </div>

              <div className="mt-6 space-y-4">

                <div>

                  <p className="font-mono text-[8px] uppercase tracking-wider text-slate-700">
                    Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-200">
                    {order.name}
                  </p>

                </div>

                <div>

                  <p className="font-mono text-[8px] uppercase tracking-wider text-slate-700">
                    Email
                  </p>

                  <p className="mt-1 break-all font-mono text-[10px] text-slate-400">
                    {order.email}
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <p className="font-mono text-[8px] uppercase tracking-wider text-slate-700">
                      Phone
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {order.phone}
                    </p>

                  </div>

                  <div>

                    <p className="font-mono text-[8px] uppercase tracking-wider text-slate-700">
                      Tickets
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {order.quantity}
                    </p>

                  </div>

                </div>

              </div>

              {/* Total */}

              <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">

                <div>

                  <p className="font-mono text-[8px] uppercase tracking-wider text-slate-700">
                    Total payable
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {order.quantity} × ₹
                    {order.pricePerTicket.toLocaleString('en-IN')}
                  </p>

                </div>

                <span className="font-display text-3xl text-[#F59E0B]">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>

              </div>

            </section>

            {/* ==================================================
                CONFIRMATION CARD
            ================================================== */}

            <section className="relative flex-1 overflow-hidden rounded-[1.75rem] border border-[#2563EB]/20 bg-gradient-to-br from-[#142653] via-[#111D3D] to-[#101A34] p-5 sm:p-7">

              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#2563EB]/10 blur-3xl" />

              <div className="relative">

                <div className="flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />

                  <SectionLabel>
                    Final step
                  </SectionLabel>

                </div>

                <h2 className="mt-2 font-display text-3xl uppercase leading-none text-white">
                  Confirm Payment
                </h2>

                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Enter the 12-digit UTR shown in your UPI payment
                  receipt.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6"
                >

                  <label className="mb-2 block font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-slate-600">
                    UPI Transaction ID / UTR
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={12}
                      value={upiTxnId}
                      onChange={(e) =>
                        setUpiTxnId(
                          e.target.value
                            .replace(/\D/g, '')
                            .slice(0, 12)
                        )
                      }
                      placeholder="Enter 12-digit UTR"
                      className="
                        h-14
                        w-full
                        rounded-xl
                        border border-white/10
                        bg-[#0B142F]
                        px-4 pr-14
                        font-mono text-sm
                        text-white
                        outline-none
                        transition-all
                        placeholder:text-slate-700
                        focus:border-[#2563EB]/60
                        focus:ring-4
                        focus:ring-[#2563EB]/10
                      "
                      required
                    />

                    <span
                      className={`
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        font-mono
                        text-[9px]
                        ${
                          upiTxnId.length === 12
                            ? 'text-[#4ADE80]'
                            : 'text-slate-700'
                        }
                      `}
                    >
                      {upiTxnId.length}/12
                    </span>

                  </div>

                  {error && (
                    <div className="mt-3 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-3 text-xs leading-5 text-red-300">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      loading ||
                      upiTxnId.length !== 12
                    }
                    className="
                      mt-4
                      flex
                      h-14
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#2563EB]
                      px-5
                      font-body
                      text-sm
                      font-bold
                      text-white
                      shadow-xl
                      shadow-blue-950/40
                      transition-all
                      duration-200
                      hover:bg-[#3B82F6]
                      hover:shadow-blue-900/50
                      active:scale-[0.99]
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                  >

                    {loading ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="opacity-25"
                          />

                          <path
                            fill="currentColor"
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>

                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Payment

                        <span className="text-[#FBBF24]">
                          →
                        </span>
                      </>
                    )}

                  </button>

                </form>

                <div className="mt-5 flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />

                  <p className="font-mono text-[8px] uppercase tracking-wider text-slate-600">
                    Payment details are securely submitted
                  </p>

                </div>

              </div>

            </section>

          </div>

        </div>

        {/* ======================================================
            BOTTOM
        ====================================================== */}

        <footer className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">

          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-700">
            {EVENT_NAME}
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="
              font-mono
              text-[8px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-slate-700
              transition
              hover:text-[#60A5FA]
            "
          >
            Cancel & return
          </button>

        </footer>

      </div>

    </main>
  );
}