import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MAX_TICKETS, TICKET_TIERS } from '../../config/event.js';

export default function RegisterForm() {
  const navigate = useNavigate();
const [ticketType, setTicketType] = useState(
  TICKET_TIERS.find((t) => t.key === 'VIP')?.key || TICKET_TIERS[0]?.key || 'General'
);
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', quantity: 1 });
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in your name, email, and phone number.');
      return;
    }
    if (!/^\d{10}$/.test(form.phone.trim())) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    const quantity = Number(form.quantity);
    if (!quantity || quantity < 1 || quantity > MAX_TICKETS) {
      setError(`Quantity must be between 1 and ${MAX_TICKETS}.`);
      return;
    }

    sessionStorage.setItem(
      'pending_booking',
      JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        ticketType,
        quantity,
      })
    );
    navigate('/payment');
  }

  const selectedTier = TICKET_TIERS.find((t) => t.key === ticketType);
  const price = selectedTier ? selectedTier.price : 0;
  const total = price * (Number(form.quantity) || 0);

  return (
    <form onSubmit={handleSubmit} id="register" className="card mx-auto max-w-xl space-y-6 p-6 text-left sm:p-8">
      {/* ticket tier picker */}
      <div className="grid gap-3 sm:grid-cols-2">
        {TICKET_TIERS.map((tier) => (
          <button
            type="button"
            key={tier.key}
            onClick={() => setTicketType(tier.key)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              ticketType === tier.key
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-bone-100/10 bg-ink-900/40 hover:border-bone-100/25'
            }`}
          >
            <p className="font-display text-lg text-bone-100">{tier.key}</p>
            <p className="mt-1 font-display text-2xl font-bold text-amber-400">₹{tier.price}</p>
            <p className="mt-2 font-body text-xs text-bone-400">{tier.perks}</p>
          </button>
        ))}
      </div>

      {/* contact details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-bone-300 font-mono">Full name</label>
          <input
            type="text"
            className="input-field"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider text-bone-300 font-mono">Email</label>
          <input
            type="email"
            className="input-field"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider text-bone-300 font-mono">Phone</label>
          <input
            type="tel"
            className="input-field"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
            placeholder="10-digit number"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider text-bone-300 font-mono">City (optional)</label>
          <input
            type="text"
            className="input-field"
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider text-bone-300 font-mono">
            Quantity (max {MAX_TICKETS})
          </label>
          <input
            type="number"
            min={1}
            max={MAX_TICKETS}
            className="input-field"
            value={form.quantity}
            onChange={(e) => update('quantity', e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-bone-100/10 pt-4">
        <span className="font-mono text-xs uppercase tracking-wider text-bone-400">Total</span>
        <span className="font-display text-2xl font-bold text-amber-400">₹{total.toLocaleString('en-IN')}</span>
      </div>

      {error && (
        <p className="rounded-lg bg-blue-500/10 px-3 py-2 text-center font-body text-sm text-blue-400 border border-blue-500/20">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full">
        Continue to payment
      </button>
    </form>
  );
}