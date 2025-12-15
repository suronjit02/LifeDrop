import { MdMenu } from "react-icons/md";

const DashboardTopbar = ({ setOpen }) => {
  return (
    <div className="md:hidden flex items-center gap-4 bg-[#05b4cd] text-white p-4">
      <button onClick={() => setOpen(true)}>
        <MdMenu className="text-3xl" />
      </button>
      <h2 className="text-lg font-bold">Dashboard</h2>
    </div>
  );
};

export default DashboardTopbar;
