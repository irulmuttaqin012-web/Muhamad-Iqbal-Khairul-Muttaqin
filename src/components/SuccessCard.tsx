import React, { useState } from 'react';

interface SuccessCardProps {
  ticketId: string;
  savedTime: string;
  onReset: () => void;
  onOpenCommunityWall: () => void;
  onPlayClickSound: () => void;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({
  ticketId,
  savedTime,
  onReset,
  onOpenCommunityWall,
  onPlayClickSound,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    onPlayClickSound();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      window.prompt(
        'Salin tautan ini untuk rekan sesama mahasiswa S2 Maksi UNDIP:',
        window.location.href
      );
    }
  };

  return (
    <div
      id="successCard"
      className="bg-white rounded-3xl p-8 sm:p-12 card-shadow border border-slate-100 text-center animate-slide-up"
    >
      {/* Celebratory Floating Icon Badge */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-undip-gold/20 animate-ping" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-undip-gold to-undip-orange flex items-center justify-center text-5xl shadow-xl animate-float">
          ✨
        </div>
      </div>

      {/* UNDIP Badge */}
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-3">
        ✓ Cerita Berhasil Terkirim Secara Aman
      </span>

      {/* Success Warm Message */}
      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-undip-navy mb-4 leading-tight">
        Terima kasih sudah berani bercerita.
      </h2>

      <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8 shadow-sm">
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          &quot;Masukanmu sangat berharga untuk membuat{' '}
          <span className="font-semibold text-undip-navy">Maksi UNDIP</span> menjadi lebih baik.{' '}
          <br className="hidden sm:inline" />
          <span className="text-undip-orange font-bold">Tetap semangat!</span>&quot;
        </p>
      </div>

      {/* Submission Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto text-left text-xs mb-8">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[10px] uppercase font-medium">Waktu Simpan</span>
          <span id="savedTime" className="font-semibold text-slate-700">
            {savedTime || 'Baru saja'}
          </span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[10px] uppercase font-medium">Status Privasi</span>
          <span className="font-semibold text-emerald-600 flex items-center gap-1">
            🔒 100% Anonim
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[10px] uppercase font-medium">ID Tiket Suara</span>
          <span id="ticketId" className="font-mono font-bold text-undip-navy">
            {ticketId}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-undip-navy hover:bg-undip-navy-light text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Kirim Cerita Baru</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <svg className="w-4 h-4 text-undip-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <span id="shareBtnText">
            {copied ? '✓ Tautan Berhasil Disalin!' : 'Bagikan Tautan ke Teman S2'}
          </span>
        </button>
      </div>

      {/* Dinding Aspirasi link */}
      <div className="mt-4">
        <button
          type="button"
          onClick={onOpenCommunityWall}
          className="text-xs text-undip-navy hover:text-undip-orange font-semibold inline-flex items-center gap-1.5 transition underline decoration-undip-gold/60"
        >
          <span>📊</span>
          <span>Lihat Aspirasi Angkatan & Catatan Solusi Prodi</span>
        </button>
      </div>

      {/* Hotline / Academic Support Info */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
        <span>Butuh bantuan konseling cepat?</span>
        <a
          href="mailto:maksi@live.undip.ac.id"
          className="text-undip-navy font-semibold hover:underline flex items-center gap-1"
        >
          <span>✉️ Sekretariat Maksi FEB UNDIP</span>
        </a>
      </div>
    </div>
  );
};
