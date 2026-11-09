import React from 'react';
import { QUICK_STORY_PROMPTS } from '../utils/logic';

interface Step3StoryProps {
  story: string;
  onChangeStory: (value: string) => void;
  onInsertPrompt: (promptText: string) => void;
  onBack: () => void;
  onNext: () => void;
  hasError: boolean;
}

export const Step3Story: React.FC<Step3StoryProps> = ({
  story,
  onChangeStory,
  onInsertPrompt,
  onBack,
  onNext,
  hasError,
}) => {
  const maxChars = 1500;
  const currentChars = story.length;

  return (
    <div
      id="stepCard-3"
      className="step-card bg-white rounded-3xl p-6 sm:p-9 card-shadow border border-slate-100 animate-slide-up"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-undip-gold/15 text-undip-orange">
          Langkah 3
        </span>
        <span className="text-xs text-slate-400 font-medium">· Safe Story Space</span>
      </div>

      <h2 className="font-heading font-bold text-xl sm:text-2xl text-undip-navy mb-2">
        Ceritakan lebih detail di sini...
      </h2>
      <p className="text-sm text-slate-500 mb-4 leading-relaxed">
        Tuliskan apa pun yang membebani pikiran Anda. Tidak ada format kaku, ceritakan dengan gaya
        bahasa Anda sendiri.
      </p>

      {/* Quick Inspiration Pills */}
      <div className="mb-3">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1.5">
          💡 Inspirasi curhat (klik untuk menyisipkan):
        </span>
        <div className="flex flex-wrap gap-1.5 text-xs">
          {QUICK_STORY_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onInsertPrompt(p.text)}
              className="bg-slate-100 hover:bg-undip-gold/15 hover:text-undip-navy text-slate-600 px-3 py-1 rounded-lg border border-slate-200 transition cursor-pointer"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative mb-2">
        <textarea
          id="ceritaInput"
          rows={6}
          value={story}
          maxLength={maxChars}
          onChange={(e) => onChangeStory(e.target.value)}
          placeholder="Misalnya: Saya kesulitan membagi waktu antara pekerjaan kantor di akhir bulan dan deadline revisi proposal tesis..."
          className="w-full p-4 sm:p-5 rounded-2xl border-2 border-slate-200 focus:border-undip-navy focus:ring-4 focus:ring-undip-gold/20 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-800 text-sm sm:text-base leading-relaxed transition-all resize-y placeholder:text-slate-400 placeholder:italic font-normal"
        />
      </div>

      {/* Character Counter & Privacy note */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Hanya dibaca oleh tim evaluator akademik Maksi UNDIP
        </span>
        <span id="charCounter">{currentChars} / {maxChars} karakter</span>
      </div>

      {/* Error Warning */}
      {hasError && (
        <p
          id="errorStep3"
          className="text-rose-500 text-xs font-semibold mb-4 flex items-center gap-1.5 animate-fade-in"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Mohon ceritakan sedikit kendala Anda (minimal 10 karakter).
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
          <span>Lanjut: Harapan Solusi</span>
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
