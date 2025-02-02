import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import CollapsibleRow from "./CollapsibleRow";
import { useEffect, useState } from "react";
import { getAllLogs } from "../api/device";
import { Spinner } from "./ui/spinner";
import { useDevice } from "../state/DeviceContext";
import { PRIORITIES } from "../lib/enums";

const getPriorityColor = (priority) => {
  switch (priority) {
    case PRIORITIES.DEBUG:
      return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    case PRIORITIES.INFO:
      return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
    case PRIORITIES.WARN:
      return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
    case PRIORITIES.ERROR:
      return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
    default:
      return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
  }
};

export default function LogTable({ newLogs }) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const device = useDevice();

  useEffect(() => {
    async function getLogs() {
      setIsLoading(true);
      if (device.deviceIp) {
        const response = await getAllLogs(device.deviceIp);
        setLogs(response);
      }
      setIsLoading(false);
    }
    getLogs();
  }, [device]);

  useEffect(() => {
    if (newLogs.length > 0) {
      setIsLoading(true);
      setLogs([]);

      setTimeout(() => {
        setLogs(newLogs);
        setIsLoading(false);
      }, 300);
    }
  }, [newLogs]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full rounded-md border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="w-[80px] text-gray-900 dark:text-gray-100">
                PID
              </TableHead>
              <TableHead className="w-[80px] text-gray-900 dark:text-gray-100">
                TID
              </TableHead>
              <TableHead className="w-[150px] text-gray-900 dark:text-gray-100">
                TAG
              </TableHead>
              <TableHead className="min-w-[200px] max-w-[400px] text-gray-900 dark:text-gray-100">
                MESSAGE
              </TableHead>
              <TableHead className="w-[100px] text-center text-gray-900 dark:text-gray-100">
                PRIORITY
              </TableHead>
              <TableHead className="w-[180px] text-center text-gray-900 dark:text-gray-100">
                TIMESTAMP
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white dark:bg-gray-900">
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  <Spinner show={isLoading} />
                </TableCell>
              </TableRow>
            )}
            {logs ? (
              logs.map((log, index) => (
                <Collapsible key={index} asChild>
                  <>
                    <CollapsibleTrigger asChild>
                      <TableRow>
                        <TableCell>{log.pid}</TableCell>
                        <TableCell>{log.tid}</TableCell>
                        <TableCell className="truncate">{log.tag}</TableCell>
                        <TableCell className="break-words">
                          <div className="max-w-[400px]">
                            {log.message.length > 50
                              ? log.message.slice(0, 100) + "..."
                              : log.message}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              log.priority
                            )}`}
                          >
                            {log.priority}
                          </span>
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          {log.timestamp}
                        </TableCell>
                      </TableRow>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <CollapsibleRow log={log} />
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No logs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {!device.deviceIp && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            Connect to a device to see logs
          </div>
        )}
      </div>
    </div>
  );
}
