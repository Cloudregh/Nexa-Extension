import { useEffect, useRef, useCallback } from 'react';
import { useTranscriptStore } from '../store/useTranscriptStore';
import { generateNotes } from '../background';

// Use proper types for Speech Recognition
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  audioStream?: MediaStream;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function createRecognition(
  audioStream?: MediaStream
): SpeechRecognition | null {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Speech recognition is not supported in this browser.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  if (audioStream) {
    recognition.audioStream = audioStream;
  }

  return recognition;
}

function setupRecognitionHandlers(
  recognition: SpeechRecognition,
  onError: (err: string) => void
) {
  const { setInterimText, appendTranscript } = useTranscriptStore.getState();

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (interimTranscript) {
      setInterimText(interimTranscript);
    }

    if (finalTranscript.trim()) {
      appendTranscript(finalTranscript.trim());
    }
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error);
    if (event.error === 'not-allowed') {
      useTranscriptStore.getState().toggleRecording();
    }
    onError(event.error);
  };

  recognition.onend = () => {
    const { isRecording } = useTranscriptStore.getState();
    if (isRecording) {
      try {
        recognition.start();
      } catch {
        // already started
      }
    }
  };
}

async function getCurrentTabId(): Promise<number | null> {
  return new Promise((resolve) => {
    if (typeof chrome === 'undefined' || !chrome.tabs) {
      resolve(null);
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]?.id ?? null);
    });
  });
}

async function captureTabAudio(): Promise<MediaStream | null> {
  const tabId = await getCurrentTabId();
  if (!tabId) return null;

  return new Promise((resolve) => {
    chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
      if (chrome.runtime.lastError || !stream) {
        console.error('Tab capture failed:', chrome.runtime.lastError?.message);
        resolve(null);
        return;
      }
      resolve(stream);
    });
  });
}

export const useSpeechRecognition = () => {
  const { isRecording, audioSource } = useTranscriptStore();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const tabStreamRef = useRef<MediaStream | null>(null);
  const wasRecordingRef = useRef(false);

  const cleanup = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch {
        // already stopped
      }
      recognitionRef.current = null;
    }
    if (tabStreamRef.current) {
      tabStreamRef.current.getTracks().forEach((t) => t.stop());
      tabStreamRef.current = null;
    }
  }, []);

  const startAmbient = useCallback(() => {
    cleanup();
    const recognition = createRecognition();
    if (!recognition) return;

    setupRecognitionHandlers(recognition, () => {});
    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      // already started
    }
  }, [cleanup]);

  const startTab = useCallback(async () => {
    cleanup();

    const stream = await captureTabAudio();
    if (!stream) {
      console.error('Could not capture tab audio');
      useTranscriptStore.getState().toggleRecording();
      return;
    }

    tabStreamRef.current = stream;

    const recognition = createRecognition(stream);
    if (!recognition) return;

    setupRecognitionHandlers(recognition, () => {});
    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      // already started
    }
  }, [cleanup]);

  const sendTranscriptToWorker = useCallback(async () => {
    const { transcript, setAiResult, setAiLoading } = useTranscriptStore.getState();
    if (transcript.length === 0) return;

    const fullText = transcript.map((e) => e.text).join('\n');

    setAiLoading(true);
    setAiResult('');

    const result = await generateNotes(fullText);
    console.log('Received AI result:', result);
    
    setAiResult(result);

    setAiLoading(false);
  }, []);

  useEffect(() => {
    // Detect transition from recording to stopped
    if (wasRecordingRef.current && !isRecording) {
      sendTranscriptToWorker();
      console.log('Stopped recording, sent transcript to worker');
    }
    wasRecordingRef.current = isRecording;

    if (!isRecording) {
      cleanup();
      return;
    }

    if (audioSource === 'ambient') {
      startAmbient();
    } else {
      startTab();
    }

    return () => {
      cleanup();
    };
  }, [isRecording, audioSource, cleanup, startAmbient, startTab, sendTranscriptToWorker]);
};
