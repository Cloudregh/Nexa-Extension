import { create } from 'zustand'

export type AudioSource = 'ambient' | 'tab'

export interface TranscriptEntry {
  text: string;
  timestamp: string;
  isActive: boolean;
}

export interface Insights {
  keyPoints: string[];
  summary: string;
  terms: { category: string; value: string }[];
}

interface TranscriptState {
  isRecording: boolean;
  audioSource: AudioSource;
  isListeningUiOpen: boolean;
  transcript: TranscriptEntry[];
  interimText: string;
  insights: Insights;
  aiResult: string;
  aiLoading: boolean;
  duration: number;

  // Actions
  toggleRecording: () => void;
  setAudioSource: (source: AudioSource) => void;
  toggleListeningUi: () => void;
  setInterimText: (text: string) => void;
  appendTranscript: (text: string) => void;
  setAiResult: (text: string) => void;
  setAiLoading: (loading: boolean) => void;
  tickDuration: () => void;
  reset: () => void;
}

export const useTranscriptStore = create<TranscriptState>((set) => ({
  isRecording: false,
  audioSource: 'ambient',
  isListeningUiOpen: true,
  transcript: [],
  interimText: '',
  insights: {
    keyPoints: [
      'Focus on Modular Intelligence for better node communication.',
      "Reduction of Cognitive Load through pre-filtering context.",
      "Implementation of the 'Curator' Model for digital archiving."
    ],
    summary: 'The discussion is shifting from raw data processing to high-level information curation. The team is aiming to build a system that acts as a proactive digital archivist to help users manage information density.',
    terms: [
      { category: 'ARCHITECTURE', value: 'Modular Intel' },
      { category: 'UX METRIC', value: 'Cognitive Load' },
      { category: 'AI LOGIC', value: 'Context Filter' },
      { category: 'PERSONA', value: 'Digital Curator' }
    ]
  },
  aiResult: '',
  aiLoading: false,
  duration: 0,

  toggleRecording: () => {
    set((state) => ({ isRecording: !state.isRecording }));
  },
  setAudioSource: (source) => set({ audioSource: source }),
  toggleListeningUi: () => set((state) => ({ isListeningUiOpen: !state.isListeningUiOpen })),
  setInterimText: (text) => {
      console.log('Setting interim text:', text);
      set({ interimText: text });
  },
  appendTranscript: (text) => {
    const newEntry: TranscriptEntry = {
      text,
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      isActive: false
    };
    set((state) => ({
      transcript: [...state.transcript.map(t => ({ ...t, isActive: false })), newEntry],
      interimText: ''
    }));
  },
  setAiResult: (text) => {
    console.log('Setting AI Result:', text);
    set({ aiResult: text })
  },
  setAiLoading: (loading) => set({ aiLoading: loading }),
  tickDuration: () => set((state) => ({ duration: state.duration + 1 })),
  reset: () => set({
    isRecording: false,
    transcript: [],
    interimText: '',
    insights: { keyPoints: [], summary: '', terms: [] },
    aiResult: '',
    aiLoading: false,
    duration: 0
  })
}));
