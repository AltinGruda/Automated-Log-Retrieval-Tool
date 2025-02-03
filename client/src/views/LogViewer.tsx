import LogTableWrapper from "../components/LogTableWrapper";
import Sidebar from "../components/Sidebar";
import { MoonIcon, RefreshCcw, SunIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "../components/theme-provider";
import { useDevice } from "../state/DeviceContext";

export default function LogViewer() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="w-64 p-6 bg-white dark:bg-gray-800 shadow-lg">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Log Viewer
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <LogTableWrapper />
      </div>
    </div>
  );
}
