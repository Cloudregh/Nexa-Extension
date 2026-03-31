import { TopBar } from './components/TopBar';
import { InsightsPanel } from './components/InsightsPanel';
import { ListeningPanel } from './components/ListeningOverlay';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useTranscriptStore } from './store/useTranscriptStore';

function App() {
  useSpeechRecognition();
  const { isListeningUiOpen } = useTranscriptStore();

  return (
    <div className="w-[450px] h-[600px] flex flex-col bg-[#F8F9FB] font-sans selection:bg-blue-100">
      <TopBar />
      {/* Single scrollable area — ListeningPanel stays at top, InsightsPanel flows below */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {isListeningUiOpen && <ListeningPanel />}
        <InsightsPanel />
      </div>
    </div>
  );
}

export default App;
