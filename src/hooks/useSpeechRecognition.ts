import { useEffect, useRef } from 'react';
import { useTranscriptStore } from '../store/useTranscriptStore';

export const useSpeechRecognition = () => {
  const { isRecording, setInterimText, appendTranscript } = useTranscriptStore();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition is not supported in this browser.');
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
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
           
           // Mocking sending chunk to service worker
           if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
             try {
                chrome.runtime.sendMessage({ type: 'PROCESS_TEXT', text: finalTranscript.trim() }, () => {
                   // Ignore response as per mock isolation instruction
                   if (chrome.runtime.lastError) {
                      // Silently swallow in mock mode
                   }
                });
             } catch (e) {
               // Ignore context invalidated
             }
           }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
            useTranscriptStore.getState().toggleRecording();
        }
      };

      // Restart automatically if still supposed to be recording
      recognition.onend = () => {
        if (useTranscriptStore.getState().isRecording) {
            try {
              recognition.start();
            } catch (e) {
               // already started
            }
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.log('Recognition already started');
      }
    } else {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  }, [isRecording]);
};
