import { TopBar } from './components/TopBar';
import { InsightsPanel } from './components/InsightsPanel';
import { ListeningOverlay } from './components/ListeningOverlay';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useTranscriptStore } from './store/useTranscriptStore';

function App() {
  useSpeechRecognition();
  const { isListeningUiOpen } = useTranscriptStore();

  return (
    <div className="w-[450px] h-[600px] flex flex-col bg-[#F8F9FB] overflow-hidden font-sans selection:bg-blue-100 relative">
      <TopBar />
      {isListeningUiOpen && <ListeningOverlay />}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative z-10">
        <InsightsPanel />
      </div>
    </div>
  );
}

export default App;
