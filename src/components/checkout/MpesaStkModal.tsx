"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/data/products";
import { CheckCircle2, X, Smartphone, AlertCircle, Loader2 } from "lucide-react";

interface MpesaStkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (transactionCode: string) => void;
  phone: string;
  amount: number;
}

export function MpesaStkModal({
  isOpen,
  onClose,
  onSuccess,
  phone,
  amount,
}: MpesaStkModalProps) {
  const [step, setStep] = useState<"sending" | "prompted" | "pin" | "success" | "failed">("sending");
  const [pin, setPin] = useState("");
  const [timer, setTimer] = useState(30);
  const [errorMsg, setErrorMsg] = useState("");

  // Format phone to readable Kenya standard
  const formattedDisplayPhone = phone.startsWith("254") 
    ? "0" + phone.slice(3) 
    : phone;

  useEffect(() => {
    if (!isOpen) {
      setStep("sending");
      setPin("");
      setTimer(30);
      setErrorMsg("");
      return;
    }

    // Step 1: Sending STK Push (1.5s)
    const sendTimer = setTimeout(() => {
      setStep("prompted");
    }, 1500);

    return () => clearTimeout(sendTimer);
  }, [isOpen]);

  // Countdown timer when prompted
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && (step === "prompted" || step === "pin") && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && (step === "prompted" || step === "pin")) {
      setStep("failed");
      setErrorMsg("M-Pesa request timed out. Please try again.");
    }
    return () => clearInterval(interval);
  }, [isOpen, step, timer]);

  const handleSimulatePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setErrorMsg("Please enter a 4-digit M-Pesa PIN");
      return;
    }

    setStep("sending");
    setTimeout(() => {
      const generatedCode = "SAB" + Math.floor(1000000 + Math.random() * 9000000);
      setStep("success");
      setTimeout(() => {
        onSuccess(generatedCode);
      }, 1800);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in-fast">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-scale-in">
        
        {/* Safaricom M-Pesa Header */}
        <div className="bg-[#4CAF50] text-white p-5 flex justify-between items-center relative">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#4CAF50] font-black text-lg shadow-sm">
              M
            </div>
            <div>
              <h3 className="font-bold text-base tracking-wide leading-none">M-PESA Express</h3>
              <p className="text-xs text-white/80 mt-0.5">Safaricom Payment Request</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">

          {/* STEP 1: SENDING / PROCESSING */}
          {step === "sending" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto text-[#4CAF50]">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Initiating STK Push...</h4>
                <p className="text-xs text-slate-500 mt-1">Sending prompt to <span className="font-semibold text-slate-800">{formattedDisplayPhone}</span></p>
              </div>
            </div>
          )}

          {/* STEP 2: STK PUSH PROMPTED ON PHONE */}
          {step === "prompted" && (
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                <div className="w-12 h-12 bg-[#4CAF50]/15 text-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Smartphone className="w-6 h-6 animate-bounce" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Check your phone screen</p>
                <p className="text-xl font-black text-slate-900 mt-1">{formatPrice(amount)}</p>
                <p className="text-xs text-slate-600 mt-0.5">Pay to: <span className="font-bold text-slate-800">TECH BAZAAR</span></p>
              </div>

              {/* Interactive Phone Screen Simulator Prompt */}
              <div className="border-2 border-[#4CAF50] bg-slate-900 text-white rounded-2xl p-4 shadow-lg text-sm space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>M-PESA System</span>
                  <span className="text-[#4CAF50] font-mono">{timer}s</span>
                </div>
                <p className="text-xs text-slate-200">
                  Do you want to pay <strong className="text-white">KSh {amount.toLocaleString()}</strong> to <strong className="text-white">TECH BAZAAR</strong> for Order?
                </p>
                <button
                  onClick={() => setStep("pin")}
                  className="w-full bg-[#4CAF50] hover:bg-[#43A047] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  Enter M-Pesa PIN
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SIMULATED PIN INPUT */}
          {step === "pin" && (
            <form onSubmit={handleSimulatePinSubmit} className="space-y-4">
              <div className="text-center">
                <p className="text-xs text-slate-500">Enter your 4-Digit M-Pesa PIN</p>
                <p className="text-lg font-bold text-[#4CAF50] mt-0.5">KSh {amount.toLocaleString()}</p>
              </div>

              <div className="flex justify-center">
                <input
                  type="password"
                  maxLength={4}
                  autoFocus
                  className="w-40 text-center tracking-[0.6em] text-2xl font-mono bg-slate-100 border-2 border-[#4CAF50] focus:border-[#4CAF50] rounded-xl py-3 text-slate-900 focus:outline-none shadow-inner"
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/\D/g, ""));
                    setErrorMsg("");
                  }}
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-500 text-center flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={pin.length !== 4}
                className="w-full bg-[#4CAF50] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md"
              >
                Send Payment
              </button>
            </form>
          )}

          {/* STEP 4: SUCCESS */}
          {step === "success" && (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 bg-green-100 text-[#4CAF50] rounded-full flex items-center justify-center mx-auto animate-scale-in">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Payment Confirmed!</h4>
              <p className="text-xs text-slate-500">M-Pesa transaction processed successfully.</p>
            </div>
          )}

          {/* STEP 5: FAILED */}
          {step === "failed" && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Transaction Cancelled</h4>
                <p className="text-xs text-slate-500 mt-1">{errorMsg || "Payment was cancelled or timed out."}</p>
              </div>
              <button
                onClick={() => {
                  setStep("sending");
                  setTimer(30);
                  setErrorMsg("");
                  setTimeout(() => setStep("prompted"), 1200);
                }}
                className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800"
              >
                Try Again
              </button>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-center">
          <p className="text-[11px] text-slate-400 font-medium">Secured by Safaricom M-Pesa Daraja API</p>
        </div>
      </div>
    </div>
  );
}
