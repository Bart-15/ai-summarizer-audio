import "./App.css";
import AiSummarizer from "./features/ai-summarizer";
import Provider from "./provider";

function App() {
  return (
    <Provider>
      <AiSummarizer />
    </Provider>
  );
}

export default App;
