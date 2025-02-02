import { TableCell, TableRow } from "./ui/table";

export default function CollapsibleRow({ log }: { log: any }) {
  return (
    <>
      <TableRow key={log.pid} className="bg-[#eff8fe]">
        <TableCell colSpan={6}>{log.message}</TableCell>
      </TableRow>
    </>
  );
}
