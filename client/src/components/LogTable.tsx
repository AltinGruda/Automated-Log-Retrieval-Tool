import Filters from "./Filters";
import LinksTable from "./LinksTable";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

export default function LogTable() {
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
        <LinksTable />
      </div>
    </div>
  );
}
