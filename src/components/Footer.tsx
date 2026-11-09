import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-8 text-center text-xs text-slate-500 mt-12">
      <div className="max-w-4xl mx-auto px-4 space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <span className="font-heading font-bold text-undip-navy">Suara Maksi</span>
          <span>·</span>
          <span>Program Studi Magister Akuntansi</span>
          <span>·</span>
          <span className="font-medium text-slate-700">Universitas Diponegoro</span>
        </div>
        <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
          Kanal aspirasi independen demi terciptanya iklim akademik S2 yang sehat, suportif, dan
          humanis di lingkungan Kampus Tembalang, Semarang.
        </p>
        <div className="text-[11px] text-slate-400">
          &copy; 2026 Suara Maksi UNDIP. Semua identitas responden terlindungi 100%.
        </div>
      </div>
    </footer>
  );
};
