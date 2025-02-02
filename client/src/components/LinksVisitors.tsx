import { TableCell, TableRow } from "./ui/table";

export default function LinksVisitors({ log }: { log: any }) {
  return (
    <>
      <TableRow key={log.pid} className="bg-[#eff8fe]">
        <TableCell colSpan={3}>{log.message}</TableCell>
      </TableRow>
    </>
  );
}
