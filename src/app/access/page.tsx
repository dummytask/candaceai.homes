"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CANDACE_TERMS } from "@/lib/terms";

interface FormState {
  fullName: string;
  email: string;
  country: string;
  kitchenType: string;
  dishwasherStatus: string;
  dishwasherUsageFrequency: string;
  newDishwasherPriority: string;
  betaSource: string;
  betaInterest: string;
  agreedToTerms: boolean;
}

const initialFormState: FormState = {
  fullName: "",
  email: "",
  country: "",
  kitchenType: "",
  dishwasherStatus: "",
  dishwasherUsageFrequency: "",
  newDishwasherPriority: "",
  betaSource: "",
  betaInterest: "",
  agreedToTerms: false,
};

const STORAGE_KEY = "candace_access_application_v2";

const inputClass =
  "bg-transparent border-b border-[#222] text-[#e8e8e8] text-sm w-full py-3 outline-none placeholder:text-[#333] focus:border-[#555] transition-colors";

function RadioCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-6 py-4 text-[10px] tracking-widest uppercase cursor-pointer transition-all ${
        selected
          ? "border-[#555] text-[#e8e8e8]"
          : "border-[#1a1a1a] text-[#555] hover:border-[#333] hover:text-[#888]"
      }`}
    >
      {label}
    </button>
  );
}

function CheckboxCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`border rounded-lg px-6 py-5 text-[10px] tracking-widest uppercase cursor-pointer transition-all w-full text-left ${
        checked
          ? "border-[#555] text-[#e8e8e8]"
          : "border-[#1a1a1a] text-[#555] hover:border-[#333] hover:text-[#888]"
      }`}
    >
      <span className="mr-3">{checked ? "✓" : "○"}</span>
      {label}
    </button>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const KITCHEN_OPTIONS = [
  "Apartment / Condo",
  "Single-family house",
  "Townhouse",
  "Studio",
  "Shared/HMO",
  "Office/Business",
  "Other",
];

const DISHWASHER_STATUS_OPTIONS = [
  "Yes - I want a second unit",
  "Yes - I want to replace my current unit",
  "No - I don't own one yet",
  "No - but I've used one before",
];

const DISHWASHER_FREQUENCY_OPTIONS = [
  "Daily",
  "5-6 times per week",
  "3-4 times per week",
  "1-2 times per week",
];

const PRIORITY_OPTIONS = [
  "Intelligence & automation",
  "Energy efficiency",
  "Water saving",
  "Quiet operation",
  "Large capacity",
  "Fast wash cycles",
  "Smart app integration",
];

const SOURCE_OPTIONS = [
  "Direct invitation",
  "Social media ad",
  "Friend/family referral",
  "Email newsletter",
  "Tech blog/review site",
  "Search engine",
  "Product launch event",
];

export default function AccessForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(initialFormState);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const timer = window.setTimeout(() => {
          setForm((prev) => ({ ...prev, ...parsed }));
        }, 0);
        return () => window.clearTimeout(timer);
      } catch {
        // ignore malformed draft data
      }
    }
  }, []);

  function saveToStorage(data: Partial<FormState>) {
    const current = (() => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      } catch {
        return {};
      }
    })();

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...data }));
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function validate(): boolean {
    switch (step) {
      case 1:
        if (!form.fullName.trim()) {
          setError("Please enter your full name.");
          return false;
        }
        break;
      case 2:
        if (!form.email.trim()) {
          setError("Please enter your email.");
          return false;
        }
        break;
      case 3:
        if (!form.country.trim()) {
          setError("Please enter your country.");
          return false;
        }
        break;
      case 4:
        if (!form.kitchenType.trim()) {
          setError("Please select your kitchen type.");
          return false;
        }
        break;
      case 5:
        if (!form.dishwasherStatus) {
          setError("Please select an option.");
          return false;
        }
        break;
      case 6:
        if (!form.dishwasherUsageFrequency) {
          setError("Please select an option.");
          return false;
        }
        break;
      case 7:
        if (!form.newDishwasherPriority) {
          setError("Please select an option.");
          return false;
        }
        break;
      case 8:
        if (!form.betaSource) {
          setError("Please select an option.");
          return false;
        }
        break;
      case 9:
        if (!form.betaInterest.trim()) {
          setError("Please tell us why you're interested.");
          return false;
        }
        break;
      case 10:
        if (!form.agreedToTerms) {
          setError("You must agree to continue.");
          return false;
        }
        break;
    }

    return true;
  }

  async function handleContinue() {
    if (!validate()) return;

    saveToStorage(form);

    if (step === 11) {
      setSubmitting(true);
      try {
        const res = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data?.id) sessionStorage.setItem("applicationId", data.id);
      } catch {
        // continue regardless
      }
      setSubmitting(false);
      router.push("/access/payment");
      return;
    }

    setDirection(1);
    setStep((s) => s + 1);
    setError("");
  }

  function handleBack() {
    if (step === 1) return;
    setDirection(-1);
    setStep((s) => s - 1);
    setError("");
  }

  const stepLabel = [
    "IDENTITY",
    "CONTACT",
    "LOCATION",
    "KITCHEN",
    "DISHWASHER",
    "DISHWASHER",
    "PRIORITY",
    "SOURCE",
    "INTEREST",
    "AGREEMENT",
    "SHIPMENT",
  ][step - 1];

  const stepNum = String(step).padStart(2, "0");
  const totalSteps = "11";

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <div className="flex items-center justify-between px-8 md:px-16 py-8">
        <Link
          href="/"
          className="text-[10px] tracking-widest text-[#444] uppercase hover:text-[#666] transition-colors"
        >
          CANDACE AI
        </Link>
        <span className="text-[10px] tracking-widest text-[#444]">
          {stepNum} · {totalSteps}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 md:px-16">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p className="text-[10px] tracking-[0.3em] text-[#444] uppercase mb-8">
                {stepLabel}
              </p>

              {step === 1 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-8">
                    What is your full name?
                  </p>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className={inputClass}
                    autoFocus
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-8">
                    What is your email address?
                  </p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputClass}
                    autoFocus
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-8">
                    What country are you in?
                  </p>
                  <input
                    type="text"
                    placeholder="Country"
                    value={form.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    className={inputClass}
                    autoFocus
                  />
                </div>
              )}

              {step === 4 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-8">
                    What kind of kitchen do you have?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {KITCHEN_OPTIONS.map((opt) => (
                      <RadioCard
                        key={opt}
                        label={opt}
                        selected={form.kitchenType === opt}
                        onClick={() => updateField("kitchenType", opt)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-8">
                    Do you currently have a dishwasher?
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {DISHWASHER_STATUS_OPTIONS.map((opt) => (
                      <RadioCard
                        key={opt}
                        label={opt}
                        selected={form.dishwasherStatus === opt}
                        onClick={() => updateField("dishwasherStatus", opt)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-8">
                    Dishwasher usage frequency
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {DISHWASHER_FREQUENCY_OPTIONS.map((opt) => (
                      <RadioCard
                        key={opt}
                        label={opt}
                        selected={form.dishwasherUsageFrequency === opt}
                        onClick={() =>
                          updateField("dishwasherUsageFrequency", opt)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {step === 7 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-8">
                    What is your priority for a new dishwasher?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {PRIORITY_OPTIONS.map((opt) => (
                      <RadioCard
                        key={opt}
                        label={opt}
                        selected={form.newDishwasherPriority === opt}
                        onClick={() => updateField("newDishwasherPriority", opt)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {step === 8 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-8">
                    How did you hear about this beta program?
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {SOURCE_OPTIONS.map((opt) => (
                      <RadioCard
                        key={opt}
                        label={opt}
                        selected={form.betaSource === opt}
                        onClick={() => updateField("betaSource", opt)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {step === 9 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-8">
                    Why are you interested in beta testing?
                  </p>
                  <textarea
                    placeholder="Tell us what you want to test, learn, or improve..."
                    value={form.betaInterest}
                    onChange={(e) => updateField("betaInterest", e.target.value)}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    autoFocus
                  />
                </div>
              )}

              {step === 10 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-6">
                    Please review and agree to our terms.
                  </p>

                  <div className="terms-scroll rounded-lg border border-[#1a1a1a] bg-[#0d0d0d]/60 px-4 py-3 mb-6">
                    <p className="text-[11px] leading-relaxed text-[#888] whitespace-pre-line">
                      {CANDACE_TERMS}
                    </p>
                  </div>

                  <CheckboxCard
                    label="I agree to the Candace AI Terms of Service and Data Policy."
                    checked={form.agreedToTerms}
                    onChange={() =>
                      updateField("agreedToTerms", !form.agreedToTerms)
                    }
                  />
                </div>
              )}

              {step === 11 && (
                <div>
                  <p className="text-[#e8e8e8] text-xl font-light mb-4">
                    Initial shipment fee.
                  </p>
                  <p className="text-[#555] text-sm mb-6 leading-relaxed">
                    To confirm your application and reserve your unit, a
                    one-time shipment fee of{" "}
                    <span className="text-[#888]">$29.99</span> is required.
                    This covers priority handling, secure packaging, and
                    tracked delivery to your address. Your device will ship
                    within 5-7 business days of approval.
                  </p>
                  <div className="border border-[#1a1a1a] px-6 py-5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] tracking-widest text-[#444] uppercase">
                        Shipment Fee
                      </span>
                      <span className="text-[#e8e8e8] text-sm">$29.99</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-red-800 text-[10px] tracking-wide mt-4">
                  {error}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between px-8 md:px-16 py-8">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 1}
          className="text-[10px] tracking-widest uppercase text-[#333] hover:text-[#666] transition-colors disabled:opacity-0 disabled:pointer-events-none"
        >
          {"<- BACK"}
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={submitting}
          className="text-[10px] tracking-widest uppercase text-[#e8e8e8] hover:text-white transition-colors disabled:opacity-50"
        >
          {submitting
            ? "PROCESSING..."
            : step === 11
            ? "PAY $29.99 ->"
            : "CONTINUE ->"}
        </button>
      </div>
    </div>
  );
}
