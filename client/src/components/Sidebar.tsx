import { useEffect, useState } from "react";
import { Command } from "./ui/command";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { BadgeCheck, Check, Info, Loader2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { toast } from "sonner";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [device, setDevice] = useState<string | null>(null);

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

    setTimeout(() => {
      setIsLoading(false);
      setDevice(input); // Simulate connected device
      setOpen(false);
      toast.success("Sucessfully connected to device!");
    }, 2000); // Simulate connection delay
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-500">Better Log Viewer</h1>

      {/* Sidebar Button to Open Command Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            Connect
          </Button>
        </DialogTrigger>
        <DialogContent className="p-4">
          {/* Info Message */}
          <div className="flex items-start gap-2 p-3 mt-3 bg-blue-50 text-blue-700 rounded-lg">
            <Info className="w-5 h-5" />
            <p className="text-sm">
              Ensure your computer and the Android device are on the same WiFi
              network before connecting.
            </p>
          </div>
          <Command>
            <div className="flex items-center border rounded-md px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none focus-visible:ring-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter device IP..."
              />
            </div>
          </Command>
          <Button
            onClick={handleConnect}
            className="mt-2 w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Connect"
            )}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Connected Device Display */}
      {device && (
        <Card className="mt-4 bg-gray-100 flex items-center">
          <CardContent className="grid gap-4 p-4">
            <div className=" flex items-center gap-x-2">
              <BadgeCheck color="#03ad00" />
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">
                  Connected device:
                </p>
                <p className="text-sm text-muted-foreground">{device}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
