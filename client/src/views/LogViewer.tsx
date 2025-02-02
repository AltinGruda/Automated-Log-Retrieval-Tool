import LogTable from "../components/LogTable";
import Sidebar from "../components/Sidebar";

export default function LogViewer() {
  return (
    <div className="min-h-screen grid grid-cols-5 bg-[#f1f4f8] p-10">
      <div className="col-span-1 p-5">
        <Sidebar />
      </div>
      <div className="col-span-4 p-5">
        <LogTable />
      </div>
    </div>
  );
}
