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
import LinksVisitors from "./LinksVisitors";
import { useEffect, useState } from "react";
import { getAllLogs } from "../api/device";
import { Spinner } from "./ui/spinner";
import { useDevice } from "../state/DeviceContext";

export default function LinksTable() {
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
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Link</TableHead>
              <TableHead className="font-medium">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
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
                          <TableCell>{log.tag}</TableCell>
                          <TableCell>
                            {log.message.length > 50
                              ? log.message.slice(0, 100) + "..."
                              : log.message}
                          </TableCell>
                          <TableCell>Hi</TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <LinksVisitors log={log} />
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
