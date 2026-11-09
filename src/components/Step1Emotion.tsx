import React from 'react';
import { EmotionKey } from '../types';
import { EMOTIONS, getEmpathyQuote } from '../utils/logic';

interface Step1EmotionProps {
  selectedEmotion: EmotionKey | null;
  onSelectEmotion: (emotion: EmotionKey) => void;
  onNext: () => void;
  hasError: boolean;
}

export const Step1Emotion: React.FC<Step1EmotionProps> = ({
  selectedEmotion,
  onSelectEmotion,
  onNext,
  hasError,
}) => {
  const quote = getEmpathyQuote(selectedEmotion);

  return (
    <div
      id="stepCard-1"
      className="step-card bg-white rounded-3xl p-6 sm:p-9 card-shadow border border-slate-100 animate-slide-up"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-undip-gold/15 text-undip-orange">
          Langkah 1
        </span>
        <span className="text-xs text-slate-400 font-medium">· Emotion Check</span>
      </div>

      <h2 className="font-heading font-bold text-xl sm:text-2xl text-undip-navy mb-2">
        Bagaimana perasaanmu tentang kuliah S2 saat ini?
      </h2>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Pilih emoji yang paling menggambarkan isi hatimu hari ini. Kejujuranmu adalah langkah pertama
        menuju perbaikan.
      </p>

      {/* Emotion Grid (4 Options) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        {EMOTIONS.map((item) => {
          const isSelected = selectedEmotion === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectEmotion(item.key)}
              data-emotion={item.key}
              className={`emotion-card text-left p-4 sm:p-5 rounded-2xl border-2 flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-undip-gold cursor-pointer transition-all ${
                isSelected
                  ? 'selected border-undip-navy bg-white card-shadow-active ring-2 ring-undip-gold/40'
                  : 'border-slate-200 hover:border-undip-navy/50 bg-slate-50/60 hover:bg-white'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl ${item.bgLight} text-3xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
              >
                {item.emoji}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-heading font-bold text-base ${
                      isSelected ? 'text-undip-navy' : 'text-slate-800 group-hover:text-undip-navy'
                    }`}
                  >
                    {item.title}
                  </h3>
                  {isSelected && (
                    <span className="check-icon text-undip-navy font-bold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Empathetic Micro-Feedback Box */}
      {selectedEmotion && quote && (
        <div
          id="empathyQuoteBox"
          className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-undip-gold/10 via-undip-gold/5 to-white border border-undip-gold/30 animate-fade-in"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">💛</span>
            <div>
              <p
                id="empathyQuoteText"
                className="text-xs sm:text-sm text-undip-navy font-medium leading-relaxed"
              >
                {quote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Warning */}
      {hasError && (
        <p
          id="errorStep1"
          className="text-rose-500 text-xs font-semibold mb-4 flex items-center gap-1.5 animate-fade-in"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Mohon pilih salah satu kondisi emosi Anda untuk melanjutkan.
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-400">Pilih 1 dari 4 opsi</span>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-undip-navy hover:bg-undip-navy-light text-white font-medium text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-undip-gold cursor-pointer"
        >
          <span>Lanjut: Fokus Kendala</span>
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
