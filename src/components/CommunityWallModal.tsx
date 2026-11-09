import React, { useState } from 'react';
import { CommunityStory } from '../types';
import { CATEGORIES } from '../utils/logic';

interface CommunityWallModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: CommunityStory[];
}

export const CommunityWallModal: React.FC<CommunityWallModalProps> = ({
  isOpen,
  onClose,
  stories,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const filtered = stories.filter((item) => {
    const matchCat =
      filterCategory === 'All' || item.categories.includes(filterCategory);
    const matchSearch =
      !searchQuery.trim() ||
      item.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.hope && item.hope.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallModalTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-undip-navy-dark/70 backdrop-blur-xs animate-fade-in"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-undip-navy to-undip-navy-light text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h2 id="wallModalTitle" className="font-heading font-bold text-lg sm:text-xl text-white">
                Dinding Aspirasi S2 Maksi
              </h2>
              <span className="text-[10px] bg-undip-gold/20 text-undip-gold border border-undip-gold/40 font-semibold px-2 py-0.5 rounded-full uppercase">
                Anonim & Transparan
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Ringkasan kendala mahasiswa dan tindak lanjut konkret oleh tim prodi Maksi UNDIP.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Cari kata kunci kendala atau ID Tiket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-undip-gold"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setFilterCategory('All')}
              className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                filterCategory === 'All'
                  ? 'bg-undip-navy text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Semua ({stories.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-undip-navy text-white font-medium shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stories list */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-grow">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              <span className="text-3xl block mb-2">🔍</span>
              Tidak ada aspirasi yang cocok dengan pencarian atau filter ini.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
              >
                {/* Meta header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-undip-navy bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.ticketId}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.statusBadge}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.categories.map((c, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Story */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  &ldquo;{item.story}&rdquo;
                </p>

                {/* Hope if any */}
                {item.hope && (
                  <div className="bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-xl text-xs text-amber-900 mb-3">
                    <span className="font-semibold block text-[11px] text-amber-800">
                      💡 Usulan Solusi Mahasiswa:
                    </span>
                    {item.hope}
                  </div>
                )}

                {/* Prodi Response Note */}
                {item.prodiNote && (
                  <div className="bg-undip-navy/5 border border-undip-navy/10 p-2.5 rounded-xl text-xs text-undip-navy flex items-start gap-2">
                    <span className="text-sm">🏛️</span>
                    <div>
                      <span className="font-semibold block text-[11px] text-undip-navy">
                        Tanggapan & Tindak Lanjut Prodi:
                      </span>
                      <p className="text-slate-600 mt-0.5">{item.prodiNote}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Total {filtered.length} aspirasi mahasiswa tersimpan
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-undip-navy hover:bg-undip-navy-light text-white text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
