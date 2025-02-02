import { useEffect, useState } from "react";
import { Command } from "./ui/command";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { BadgeCheck, Info, Loader2, Search, Wifi } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { connectToAndroidDevice } from "../api/device";
import { useDevice } from "../state/DeviceContext";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { deviceIp, connectDevice } = useDevice();

  // Detect Ctrl + J to open popup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "j") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleConnect = () => {
    if (!input) return;
    setIsLoading(true);

    const connectToDevice = async () => {
      const response = await connectToAndroidDevice({ ip: input });
      if (response.success) {
        connectDevice(input);
      }
    };
    connectToDevice();
    setIsLoading(false);
    setOpen(false);
    toast.success("Sucessfully connected to device!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Better Log Viewer
      </h1>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="w-full">
            <Wifi className="mr-2 h-4 w-4" />
            Connect Device
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg mb-4">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Ensure your computer and the Android device are on the same WiFi
              network before connecting.
            </p>
          </div>
          <Command className="rounded-lg border shadow-md">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 border-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter device IP..."
              />
            </div>
          </Command>
          <Button
            onClick={handleConnect}
            className="w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wifi className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Connecting..." : "Connect"}
          </Button>
        </DialogContent>
      </Dialog>

      {deviceIp && (
        <Card className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <BadgeCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Connected device
                </p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  {deviceIp}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
