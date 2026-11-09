import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="text-center mb-8 sm:mb-12">
      {/* Badge Safe Space */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-undip-gold/15 text-undip-navy font-medium text-[11px] sm:text-xs border border-undip-gold/30 mb-4 shadow-sm animate-fade-in max-w-full">
        <span className="w-2 h-2 rounded-full bg-undip-orange shrink-0" />
        <span className="font-semibold text-undip-navy">Ruang Curhat & Solusi Akademik S2</span>
        <span className="text-slate-400">·</span>
        <span className="text-slate-600">Terbuka & Terjaga</span>
      </div>

      {/* Headline */}
      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-undip-navy tracking-tight leading-tight mb-4">
        Kami Mendengar, <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-undip-navy via-undip-navy-light to-undip-orange bg-clip-text text-transparent underline decoration-undip-gold decoration-wavy decoration-from-font">
          Kami Peduli.
        </span>
      </h1>

      {/* Sub-headline */}
      <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
        Ruang aman untuk membagikan kendala perkuliahan, tesis, atau keseimbangan waktu Anda.{' '}
        <span className="font-semibold text-undip-navy">Ceritakan apa adanya</span> tanpa rasa
        cemas.
      </p>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm">
          <svg
            className="w-4 h-4 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Tanpa Login / Akun</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Enkripsi Privasi Mahasiswa</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm">
          <svg
            className="w-4 h-4 text-undip-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>Ditindaklanjuti Prodi</span>
        </div>
      </div>
    </section>
  );
};
