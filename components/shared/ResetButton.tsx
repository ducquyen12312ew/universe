"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetDemo } from "@/lib/resetDemo";

export default function ResetButton() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleReset = () => {
    resetDemo();
    setShowModal(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/");
    }, 1800);
  };

  return (
    <>
      {/* Floating button — subtle, bottom-right */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 right-4 z-[200] px-3 py-1.5 text-[11px] text-gray-400 bg-black/5 hover:bg-black/10 rounded-full transition-colors select-none"
        title="Reset demo environment"
      >
        Reset Demo
      </button>

      {/* Confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Reset Demo Environment?</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              This will clear all local data and restore the initial state.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                style={{ borderColor: "#ddd" }}
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#c0392b" }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[300] px-5 py-2.5 bg-gray-800 text-white text-sm rounded-full shadow-lg whitespace-nowrap animate-fade-in">
          Demo environment reset successfully.
        </div>
      )}
    </>
  );
}
