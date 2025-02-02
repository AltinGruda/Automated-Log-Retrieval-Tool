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

export default function LogTable() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const device = useDevice();
  useEffect(() => {
    async function getLogs() {
      setIsLoading(true);
      if (device.deviceIp) {
        const response = await getAllLogs();
        setLogs(response);
      }
      setIsLoading(false);
    }
    getLogs();
  }, [device]);

  return (
    <div className="sm:p-4">
      <div className="rounded-md sm:border">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] font-medium">PID</TableHead>
              <TableHead className="w-[50px] font-medium">TID</TableHead>
              <TableHead className="w-[200px] font-medium">TAG</TableHead>
              <TableHead className="w-[400px] font-medium">MESSAGE</TableHead>
              <TableHead className="w-[50px] font-medium text-center">
                PRIORITY
              </TableHead>
              <TableHead className="w-[200px] font-medium text-center">
                TIMESTAMP
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  <Spinner show={isLoading} />
                </TableCell>
              </TableRow>
            )}
            {logs
              ? logs.map((log, index) => (
                  <Collapsible key={index} asChild>
                    <>
                      <CollapsibleTrigger asChild>
                        <TableRow>
                          <TableCell>{log.pid}</TableCell>
                          <TableCell>{log.tid}</TableCell>
                          <TableCell>{log.tag}</TableCell>
                          <TableCell className="break-words overflow-hidden text-ellipsis whitespace-normal w-[400px]">
                            {log.message.length > 50
                              ? log.message.slice(0, 100) + "..."
                              : log.message}
                          </TableCell>
                          <TableCell>{log.priority}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <CollapsibleRow log={log} />
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))
              : null}
          </TableBody>
        </Table>

        {!device.deviceIp && (
          <p className="text-center">Connect to a device to see logs</p>
        )}
      </div>
    </div>
  );
}
