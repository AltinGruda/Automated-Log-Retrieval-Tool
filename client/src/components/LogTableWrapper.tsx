import { useState } from "react";
import Filters from "./Filters";
import LogTable from "./LogTable";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { getLogsByMessage } from "../api/device";
import { useDevice } from "../state/DeviceContext";

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
        toast.info("Please search a keyword in the search bar.");
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
    <div>
      <div className="flex justify-start gap-5 items-center">
        <Filters />
        <Input
          type="search"
          placeholder="Search by log message..."
          className="w-96 bg-white"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <LogTable newLogs={newLogs} />
      </div>
    </div>
  );
}
