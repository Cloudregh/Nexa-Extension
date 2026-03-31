import { useTranscriptStore } from '../store/useTranscriptStore';
import type { AudioSource } from '../store/useTranscriptStore';
import { Mic, MonitorSpeaker } from 'lucide-react';

const modes: { value: AudioSource; label: string; icon: typeof Mic }[] = [
  { value: 'ambient', label: 'Ambient', icon: Mic },
  { value: 'tab', label: 'Tab Output', icon: MonitorSpeaker },
];

export const AudioModeSwitch = () => {
  const { audioSource, setAudioSource, isRecording } = useTranscriptStore();

  return (
    <div className="flex items-center bg-slate-100 rounded-full p-1 gap-1">
      {modes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setAudioSource(value)}
          disabled={isRecording}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all
            ${
              audioSource === value
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }
            ${isRecording ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
};
