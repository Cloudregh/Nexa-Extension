import { useTranscriptStore } from '../store/useTranscriptStore';
import type { AudioSource } from '../store/useTranscriptStore';
import { Mic, MonitorSpeaker, Circle } from 'lucide-react';

const modes: { value: AudioSource; label: string; icon: typeof Mic }[] = [
  { value: 'ambient', label: 'Ambient', icon: Mic },
  { value: 'tab', label: 'Tab Output', icon: MonitorSpeaker },
];

export const AudioModeSwitch = () => {
  const { audioSource, setAudioSource, isRecording, toggleRecording } = useTranscriptStore();

  return (
    <div className="flex items-center gap-2">
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

      <button
        onClick={toggleRecording}
        className={`
          w-8 h-8 rounded-full flex items-center justify-center transition-all
          ${isRecording
            ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-pulse'
            : 'bg-red-100 hover:bg-red-200'
          }
        `}
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        <Circle className={`w-3.5 h-3.5 ${isRecording ? 'text-white fill-white' : 'text-red-500 fill-red-500'}`} />
      </button>
    </div>
  );
};
