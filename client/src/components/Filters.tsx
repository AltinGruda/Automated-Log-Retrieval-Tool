import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filters() {
  const availableFilters = ["Priority", "Tag", "PID", "Time Range"];
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const removeFilter = () => {
    setActiveFilter(null);
    setSelectedValue(null);
    setDate(null);
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {/* Active Filters Display */}
      {activeFilter && (
        <div className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full">
          <span className="text-sm">
            {activeFilter}: {selectedValue || (date ? date.toISOString() : "")}
          </span>
          <button onClick={() => removeFilter()}>
            <X className="w-4 h-4 text-gray-600 hover:text-black" />
          </button>
        </div>
      )}

      {/* Add Filter Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="px-3 py-1 text-sm">
            + Add Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2 bg-white shadow-md rounded-lg">
          <div className="flex flex-col gap-2">
            {availableFilters.map((filter) => (
              <button
                key={filter}
                className="text-left p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Step 2: Popover for selecting filter values */}
      {activeFilter && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="px-3 py-1 text-sm">
              Select {activeFilter} Value
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 bg-white shadow-md rounded-lg">
            {activeFilter === "Priority" && (
              <div className="flex flex-col gap-2">
                {["High", "Medium", "Low"].map((priority) => (
                  <button
                    key={priority}
                    className="text-left p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => setSelectedValue(priority)}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            )}
            {activeFilter === "Tag" && (
              <div className="flex flex-col gap-2">
                {["Bug", "Feature", "Enhancement"].map((tag) => (
                  <button
                    key={tag}
                    className="text-left p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => setSelectedValue(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
            {activeFilter === "PID" && (
              <input
                type="text"
                placeholder="Enter PID"
                className="w-full p-2 border rounded-md"
                onChange={(e) => setSelectedValue(e.target.value)}
              />
            )}
            {activeFilter === "Time Range" && (
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                className="w-full p-2 border rounded-md"
                placeholderText="Select Date & Time"
              />
            )}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
