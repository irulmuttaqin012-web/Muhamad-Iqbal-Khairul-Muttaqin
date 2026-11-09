import React from 'react';
import { CATEGORIES } from '../utils/logic';

interface Step2FocusProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onBack: () => void;
  onNext: () => void;
  hasError: boolean;
}

export const Step2Focus: React.FC<Step2FocusProps> = ({
  selectedCategories,
  onToggleCategory,
  onBack,
  onNext,
  hasError,
}) => {
  return (
    <div
      id="stepCard-2"
      className="step-card bg-white rounded-3xl p-6 sm:p-9 card-shadow border border-slate-100 animate-slide-up"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-undip-gold/15 text-undip-orange">
          Langkah 2
        </span>
        <span className="text-xs text-slate-400 font-medium">· Dynamic Category Focus</span>
      </div>

      <h2 className="font-heading font-bold text-xl sm:text-2xl text-undip-navy mb-2">
        Bagian mana yang paling menyita pikiranmu saat ini?
      </h2>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Pilih satu atau lebih kategori yang sesuai dengan situasi Anda. (Bisa pilih lebih dari
        satu).
      </p>

      {/* Selected Categories Counter */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="text-slate-500">Pilihan Anda:</span>
        <span
          id="selectedChipsCount"
          className="font-semibold text-undip-navy bg-slate-100 px-2 py-0.5 rounded-full"
        >
          {selectedCategories.length} Kategori Dipilih
        </span>
      </div>

      {/* Chips Container */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategories.includes(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onToggleCategory(cat.id)}
              data-chip={cat.id}
              className={`chip-btn px-4 py-3 rounded-2xl border-2 text-xs sm:text-sm font-medium flex items-center gap-2.5 cursor-pointer focus:outline-none transition-all ${
                isSelected
                  ? 'active border-undip-navy bg-undip-navy text-white shadow-md'
                  : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-undip-gold'
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span>{cat.label}</span>
              {isSelected && (
                <span className="chip-badge w-4 h-4 rounded-full bg-white text-undip-navy text-[10px] flex items-center justify-center font-bold">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom chip tip */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-6 flex items-start gap-2.5 text-xs text-slate-600">
        <span className="text-base">💡</span>
        <p>
          Banyak mahasiswa S2 Maksi UNDIP juga mengalami kendala serupa, terutama keseimbangan
          antara pekerjaan kantor dan tenggat tesis. Jangan ragu memilih lebih dari satu kategori.
        </p>
      </div>

      {/* Error Warning */}
      {hasError && (
        <p
          id="errorStep2"
          className="text-rose-500 text-xs font-semibold mb-4 flex items-center gap-1.5 animate-fade-in"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Silakan pilih minimal 1 kategori fokus kendala Anda.
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-medium text-sm flex items-center gap-2 transition cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Kembali</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-undip-navy hover:bg-undip-navy-light text-white font-medium text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-undip-gold cursor-pointer"
        >
          <span>Lanjut: Ruang Bercerita</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
