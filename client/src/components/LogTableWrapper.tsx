import Filters from "./Filters";
import LogTable from "./LogTable";
import { Input } from "./ui/input";

export default function LogTableWrapper() {
  return (
    <div>
      <div className="flex justify-start gap-5 items-center">
        <Filters />
        <Input
          type="search"
          placeholder="Search by log message..."
          className="w-96 bg-white"
        />
      </div>
      <div>
        <LogTable />
      </div>
    </div>
  );
}
