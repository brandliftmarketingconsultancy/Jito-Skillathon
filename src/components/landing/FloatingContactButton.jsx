import { useState } from 'react';
import { Phone, X } from 'lucide-react';

const phoneNumbers = [
  '+91 9425138845',
  '+91 9424922011',
];

const BRAND_COLOR = '#2F6BFF';
const BRAND_COLOR_HOVER = '#1E54E0';

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {open && (
        <div className="mb-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 p-4 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-sm font-semibold text-gray-900 mb-3">Get in touch</p>

          <div className="flex flex-col gap-2">
            {phoneNumbers.map((number) => (
              <a
                key={number}
                href={`tel:${number.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-sm text-gray-600 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = BRAND_COLOR)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                <Phone className="w-4 h-4 shrink-0" />
                {number}
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Contact us"
        style={{ backgroundColor: BRAND_COLOR }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_COLOR_HOVER)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND_COLOR)}
        className="w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        {open ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>
    </div>
  );
}