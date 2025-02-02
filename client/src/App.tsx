import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { DeviceProvider } from "./state/DeviceContext";
import LogViewer from "./views/LogViewer";

function App() {
  return (
    <>
      <DeviceProvider>
        <LogViewer />
        <Toaster richColors position="top-center" />
      </DeviceProvider>
    </>
  );
}

export default App;
