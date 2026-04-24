'use client';

type Props = {
  open: boolean;
  amount: number;
  onClose: () => void;
  onConfirm: () => void;
};

export function PaymentModal({ open, amount, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 p-4 md:items-center md:justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card">
        <h3 className="text-xl font-semibold text-modviaBlack">Secure deposit</h3>
        <p className="mt-2 text-sm text-modviaGrey">Fake payment modal for MVP testing only.</p>
        <div className="mt-5 rounded-2xl bg-modviaIvory p-4">
          <div className="text-sm text-modviaGrey">Deposit amount</div>
          <div className="text-2xl font-semibold text-modviaBlack">HKD {amount.toLocaleString()}</div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button onClick={onClose} className="rounded-full border border-modviaBlack/20 px-4 py-2 text-modviaBlack">Cancel</button>
          <button onClick={onConfirm} className="rounded-full bg-modviaBlack px-4 py-2 text-white">Pay deposit and confirm</button>
        </div>
      </div>
    </div>
  );
}
