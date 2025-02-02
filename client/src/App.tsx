import "./App.css";
import { Toaster } from "./components/ui/sonner";
import LogViewer from "./views/LogViewer";

function App() {
  return (
    <>
      <LogViewer />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
