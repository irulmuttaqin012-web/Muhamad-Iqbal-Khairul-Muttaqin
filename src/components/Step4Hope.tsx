import React from 'react';
import { QUICK_HOPE_SUGGESTIONS, EMOTIONS } from '../utils/logic';
import { EmotionKey } from '../types';

interface Step4HopeProps {
  hope: string;
  onChangeHope: (value: string) => void;
  onSelectSuggestion: (suggestionText: string) => void;
  selectedEmotion: EmotionKey | null;
  selectedCategories: string[];
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export const Step4Hope: React.FC<Step4HopeProps> = ({
  hope,
  onChangeHope,
  onSelectSuggestion,
  selectedEmotion,
  selectedCategories,
  isSubmitting,
  onSubmit,
  onBack,
}) => {
  const emotionObj = EMOTIONS.find((e) => e.key === selectedEmotion);
  const emotionLabel = emotionObj
    ? `${emotionObj.emoji} ${emotionObj.title}`
    : selectedEmotion || '-';
  const categoriesText =
    selectedCategories.length > 0 ? selectedCategories.join(', ') : '-';

  return (
    <div
      id="stepCard-4"
      className="step-card bg-white rounded-3xl p-6 sm:p-9 card-shadow border border-slate-100 animate-slide-up"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-undip-gold/15 text-undip-orange">
          Langkah 4 (Terakhir)
        </span>
        <span className="text-xs text-slate-400 font-medium">· Solusi & Harapan</span>
      </div>

      <h2 className="font-heading font-bold text-xl sm:text-2xl text-undip-navy mb-2">
        Bantuan atau solusi seperti apa yang paling kamu harapkan dari Prodi Maksi UNDIP?
      </h2>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Berikan usulan konkret agar pengelola program studi dapat menghadirkan solusi yang tepat
        sasaran untuk Anda.
      </p>

      {/* Quick Suggestions */}
      <div className="mb-3">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1.5">
          ⚡ Saran populer:
        </span>
        <div className="flex flex-wrap gap-1.5 text-xs mb-3">
          {QUICK_HOPE_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSuggestion(item.text)}
              className="bg-slate-100 hover:bg-undip-gold/20 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition cursor-pointer"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Harapan */}
      <div className="mb-6">
        <textarea
          id="harapanInput"
          rows={3}
          value={hope}
          onChange={(e) => onChangeHope(e.target.value)}
          placeholder="Tuliskan harapanmu (misal: fleksibilitas bimbingan daring, klinik olah data, forum sharing berkala...)"
          className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-undip-navy focus:ring-4 focus:ring-undip-gold/20 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-800 text-sm leading-relaxed transition-all resize-y placeholder:text-slate-400 placeholder:italic"
        />
      </div>

      {/* Summary Box */}
      <div className="bg-undip-navy/5 rounded-2xl p-4 border border-undip-navy/10 mb-6">
        <h4 className="text-xs font-bold text-undip-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>📋</span> Ringkasan Curhat Anda
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-slate-500">Perasaan Saat Ini:</span>
            <span id="summaryEmotion" className="font-semibold text-undip-navy ml-1">
              {emotionLabel}
            </span>
          </div>
          <div>
            <span className="text-slate-500">Kategori Fokus:</span>
            <span id="summaryCategories" className="font-semibold text-undip-navy ml-1">
              {categoriesText}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          id="submitBtn"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-undip-navy via-undip-navy-light to-undip-navy text-white hover:from-undip-navy-dark hover:to-undip-navy font-heading font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-undip-gold/40 border border-undip-gold/30 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
        >
          <span className="text-xl">✨</span>
          <span id="btnText">
            {isSubmitting ? 'Menyimpan suaramu dengan aman...' : 'Kirim Ceritaku'}
          </span>

          {!isSubmitting ? (
            <svg
              id="btnArrow"
              className="w-5 h-5 text-undip-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          ) : (
            <div id="btnSpinner">
              <svg
                className="animate-spin h-5 w-5 text-undip-gold"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-2.5 text-center text-xs text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          ← Periksa kembali cerita di langkah sebelumnya
        </button>
      </div>
    </div>
  );
};
