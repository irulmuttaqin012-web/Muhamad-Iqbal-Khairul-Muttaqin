import React from 'react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
  onOpenCommunityWall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onReset,
  onOpenCommunityWall,
}) => {
  return (
    <>
      {/* TOP ANNOUNCEMENT BANNER */}
      <div className="bg-undip-navy-dark text-slate-200 text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-slate-300">
              Kanal Aspirasi Terbuka Mahasiswa S2 Maksi UNDIP
            </span>
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-undip-gold" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                  clipRule="evenodd"
                />
              </svg>
              100% Anonim
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-400">Tahun Akademik 2026/2027</span>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION / HEADER */}
      <header className="bg-undip-navy text-white sticky top-0 z-40 shadow-lg backdrop-blur-md bg-opacity-95 border-b border-white/10 transition-all">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onReset()}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-undip-gold to-undip-orange p-0.5 shadow-md group-hover:rotate-6 transition-transform">
              <div className="w-full h-full bg-undip-navy rounded-[10px] flex items-center justify-center">
                <span className="text-xl">🎓</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white">
                  Suara Maksi
                </span>
                <span className="text-[10px] bg-undip-gold/20 text-undip-gold border border-undip-gold/40 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  UNDIP
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-light -mt-0.5">
                Magister Akuntansi · Fakultas Ekonomika dan Bisnis
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Community Voice Wall Button */}
            <button
              type="button"
              id="communityWallBtn"
              aria-label="Dinding Aspirasi"
              onClick={onOpenCommunityWall}
              title="Lihat Suara & Tindak Lanjut Prodi"
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-undip-gold transition text-xs flex items-center gap-1.5 border border-white/5 cursor-pointer"
            >
              <span className="text-sm">📊</span>
              <span className="hidden sm:inline text-[11px]">Dinding Aspirasi</span>
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              id="soundToggleBtn"
              onClick={onToggleSound}
              title="Toggle audio feedback"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-undip-gold transition text-xs flex items-center gap-1.5 border border-white/5"
            >
              <span>{soundEnabled ? '🔔' : '🔕'}</span>
              <span className="hidden md:inline text-[11px]">
                Suara: {soundEnabled ? 'On' : 'Off'}
              </span>
            </button>

            {/* Reset Form */}
            <button
              type="button"
              id="headerResetBtn"
              onClick={() => {
                if (window.confirm('Mulai ulang pengisian formulir dari awal?')) {
                  onReset();
                }
              }}
              title="Mulai Ulang Formulir"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition text-xs flex items-center gap-1.5 border border-white/5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="hidden sm:inline text-[11px]">Ulang</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
