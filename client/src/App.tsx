import { Toaster } from "./components/ui/sonner";
import { DeviceProvider } from "./state/DeviceContext";
import LogViewer from "./views/LogViewer";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DeviceProvider>
        <LogViewer />
        <Toaster richColors position="top-center" />
      </DeviceProvider>
    </ThemeProvider>
  );
}

export default App;
