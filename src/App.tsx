import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { TranscriptPanel } from './components/TranscriptPanel';
import { InsightsPanel } from './components/InsightsPanel';
import { RecordingControls } from './components/RecordingControls';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';

function App() {
  // Mounts the Chrome Web Speech API handling which ties directly to our Global Zustand store
  useSpeechRecognition();

  return (
    <div className="h-screen w-full flex bg-[#F8F9FB] overflow-hidden font-sans selection:bg-blue-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FB]">
        <TopBar />
        <div className="flex-1 flex overflow-hidden relative">
           <TranscriptPanel />
           <InsightsPanel />
           <RecordingControls />
        </div>
      </div>
    </div>
  );
}

export default App;
