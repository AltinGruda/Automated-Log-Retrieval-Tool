import { useState } from "react";
import Filters from "./Filters";
import LogTable from "./LogTable";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { getLogsByMessage } from "../api/device";
import { useDevice } from "../state/DeviceContext";
import { Search } from "lucide-react";

export default function LogTableWrapper() {
  const { deviceIp } = useDevice();
  const [query, setQuery] = useState("");
  const [newLogs, setNewLogs] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (query.trim() === "") {
        toast.info("Please enter a keyword to search.");
        return;
      }
      const searchByMessage = async () => {
        const response = await getLogsByMessage(query, deviceIp);
        setNewLogs(response);
      };
      searchByMessage();
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <Filters />
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by log message..."
            className="pl-10 bg-white dark:bg-gray-700 focus-visible:border-none"
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <LogTable newLogs={newLogs} />
    </div>
  );
}
