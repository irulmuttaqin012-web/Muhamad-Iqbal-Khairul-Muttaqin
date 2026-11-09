import { EmotionKey, EmotionOption, CategoryOption, CommunityStory, FeedbackData } from '../types';

export const EMOTIONS: EmotionOption[] = [
  {
    key: 'overwhelmed',
    title: 'Overwhelmed',
    emoji: '😫',
    description: 'Kewalahan dengan tumpukan tugas, pekerjaan, atau tenggat waktu.',
    bgLight: 'bg-amber-100/70',
  },
  {
    key: 'stuck',
    title: 'Bingung / Stuck',
    emoji: '🤔',
    description: 'Tidak tahu harus melangkah ke mana pada topik riset atau tugas.',
    bgLight: 'bg-blue-100/70',
  },
  {
    key: 'burnout',
    title: 'Lelah / Burnout',
    emoji: '🥱',
    description: 'Energi terkuras habis, kehilangan motivasi, butuh ruang jeda.',
    bgLight: 'bg-rose-100/70',
  },
  {
    key: 'neutral',
    title: 'Biasa saja, tapi...',
    emoji: '😶',
    description: 'Tampak berjalan normal, namun ada hambatan yang mengganjal.',
    bgLight: 'bg-slate-200/70',
  },
];

export const CATEGORIES: CategoryOption[] = [
  { id: 'Tesis / Publikasi', label: 'Tesis / Publikasi', emoji: '📝' },
  { id: 'Pemahaman Matkul Akuntansi', label: 'Pemahaman Matkul Akuntansi', emoji: '📚' },
  { id: 'Dinamika Bimbingan Dosen', label: 'Dinamika Bimbingan Dosen', emoji: '🧑‍🏫' },
  { id: 'Manajemen Waktu (Kerja vs Kuliah)', label: 'Manajemen Waktu (Kerja vs Kuliah)', emoji: '⏰' },
  { id: 'Administrasi / Fasilitas', label: 'Administrasi / Fasilitas', emoji: '🏛️' },
];

export const EMPATHY_QUOTES: Record<EmotionKey, string> = {
  overwhelmed:
    'Tarik napas perlahan. Mengemban gelar S2 di samping karier atau keluarga memang luar biasa berat. Bebanmu valid, dan kamu tidak sendirian.',
  stuck:
    'Kebuntuan dalam tesis atau teori akuntansi adalah bagian alami dari proses riset. Jangan biarkan dirimu terjebak sendirian; ceritakan titik buntu itu.',
  burnout:
    'Kelelahan mental bukan tanda kelemahan, melainkan tanda bahwa kamu sudah berusaha keras melampaui batasmu. Istirahatlah sejenak, kami siap menampung ceritamu.',
  neutral:
    'Kondisi yang tampak tenang sering kali menyimpan detail kecil yang bisa ditingkatkan. Setiap masukanmu tetap sangat berarti bagi kemajuan Maksi UNDIP.',
};

export const QUICK_STORY_PROMPTS = [
  {
    title: '+ Beban kerja vs Tesis',
    text: 'Saya kesulitan membagi waktu antara lembur kerja akhir bulan dan tenggat revisi tesis...',
  },
  {
    title: '+ Metodologi Tesis',
    text: 'Saya merasa bingung menentukan metodologi penelitian tesis dan perlu arahan lebih intensif...',
  },
  {
    title: '+ Jadwal Bimbingan',
    text: 'Sulit mencocokkan jadwal bimbingan dengan dosen pembimbing karena keterbatasan waktu kerja...',
  },
];

export const QUICK_HOPE_SUGGESTIONS = [
  {
    title: '+ Bimbingan Daring Fleksibel',
    text: 'Penyediaan sesi konsultasi riset daring di akhir pekan/malam hari.',
  },
  {
    title: '+ Coaching Clinic Tesis',
    text: 'Workshop berkala penulisan artikel jurnal dan klinik pengolahan data.',
  },
  {
    title: '+ Koordinasi Deadline Tugas',
    text: 'Jadwal perkuliahan dan deadline tugas yang lebih terkoordinasi antar dosen.',
  },
];

export function getEmpathyQuote(key: EmotionKey | null): string {
  if (!key) return '';
  return EMPATHY_QUOTES[key] || '';
}

export function validateStep1(emotion: EmotionKey | null): boolean {
  return emotion !== null;
}

export function validateStep2(categories: string[]): boolean {
  return Array.isArray(categories) && categories.length > 0;
}

export function validateStep3(story: string, minChars = 10): boolean {
  return typeof story === 'string' && story.trim().length >= minChars;
}

export function generateTicketId(customSeed?: number): string {
  const num = customSeed ?? Math.floor(1000 + Math.random() * 9000);
  return `#MKSI-${num}`;
}

export function formatTimeWIB(date = new Date()): string {
  return (
    date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB'
  );
}

// Local storage key for saving user submitted stories
const STORAGE_KEY = 'suara_maksi_stories_v1';

export const INITIAL_COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: 's-1',
    ticketId: '#MKSI-4821',
    emotion: 'overwhelmed',
    categories: ['Tesis / Publikasi', 'Manajemen Waktu (Kerja vs Kuliah)'],
    story:
      'Sangat padat antara penutupan buku tahunan di kantor dengan jadwal seminar proposal tesis. Mohon ada asistensi penjadwalan khusus bagi mahasiswa kelas reguler kerja.',
    hope: 'Penyediaan sesi konsultasi riset daring di akhir pekan atau malam hari.',
    date: 'Kemarin, 19:42 WIB',
    status: 'Solusi Diterapkan',
    statusBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    prodiNote: 'Prodi kini memfasilitasi bimbingan hybrid via Zoom setiap Sabtu pagi.',
  },
  {
    id: 's-2',
    ticketId: '#MKSI-3392',
    emotion: 'stuck',
    categories: ['Pemahaman Matkul Akuntansi', 'Tesis / Publikasi'],
    story:
      'Kesulitan mengolah data panel menggunakan software statistik untuk regresi data sekunder. Banyak teman satu angkatan yang juga kebingungan di bab metodologi.',
    hope: 'Workshop berkala penulisan artikel jurnal dan klinik pengolahan data metodologi kuantitatif.',
    date: '3 hari lalu',
    status: 'Sedang Ditinjau',
    statusBadge: 'bg-amber-100 text-amber-800 border-amber-200',
    prodiNote: 'Sedang diagendakan Coaching Clinic Pengolahan Data bersama Laboratorium Akuntansi.',
  },
  {
    id: 's-3',
    ticketId: '#MKSI-1049',
    emotion: 'burnout',
    categories: ['Dinamika Bimbingan Dosen', 'Manajemen Waktu (Kerja vs Kuliah)'],
    story:
      'Dosen pembimbing sangat sibuk di kegiatan luar kampus sehingga revisi bab 4 memakan waktu hampir 2 bulan tanpa kepastian waktu review.',
    hope: 'Sistem monitoring progres bimbingan digital terpadu agar mahasiswa dan dosen saling terhubung jadwalnya.',
    date: '5 hari lalu',
    status: 'Solusi Diterapkan',
    statusBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    prodiNote: 'Portal monitoring tesis S2 Maksi diperbarui dengan pengingat notifikasi batas waktu review dosen.',
  },
];

export function getStoredStories(): CommunityStory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_COMMUNITY_STORIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_COMMUNITY_STORIES;
  } catch {
    return INITIAL_COMMUNITY_STORIES;
  }
}

export function saveStoryLocally(storyData: FeedbackData, ticketId: string): CommunityStory {
  const newStory: CommunityStory = {
    id: 's-' + Date.now(),
    ticketId,
    emotion: storyData.emotion || 'neutral',
    categories: storyData.categories,
    story: storyData.story,
    hope: storyData.hope,
    date: 'Baru saja',
    status: 'Diterima',
    statusBadge: 'bg-blue-100 text-blue-800 border-blue-200',
    prodiNote: 'Laporan Anda telah tercatat secara anonim dan akan dibahas pada rapat evaluasi bulanan Prodi Maksi.',
  };

  try {
    const existing = getStoredStories();
    const updated = [newStory, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors in restricted contexts
  }

  return newStory;
}

// Gentle Web Audio feedback
let audioCtx: AudioContext | null = null;

export function playGentleSound(type: 'click' | 'success' = 'click', enabled = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        if (!audioCtx) return;
        const chordOsc = audioCtx.createOscillator();
        const chordGain = audioCtx.createGain();
        chordOsc.connect(chordGain);
        chordGain.connect(audioCtx.destination);
        chordOsc.type = 'sine';
        chordOsc.frequency.setValueAtTime(freq, now + idx * 0.09);
        chordGain.gain.setValueAtTime(0.07, now + idx * 0.09);
        chordGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);
        chordOsc.start(now + idx * 0.09);
        chordOsc.stop(now + idx * 0.09 + 0.4);
      });
    }
  } catch {
    // Fail silently
  }
}
