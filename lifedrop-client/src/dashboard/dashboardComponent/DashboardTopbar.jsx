import { MdMenu } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import logo from "/icon.png";

const DashboardTopbar = ({ setOpen }) => {
  return (
    <div className="md:hidden flex items-center justify-between bg-[#05b4cd] text-white px-4 py-3 border-b border-white/20">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
        >
          <MdMenu className="text-xl" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
            <img className="h-4" src={logo} alt="LifeDrop" />
          </div>
          <span className="font-bold text-base text-white">
            Life<span className="text-primary">Drop</span>
          </span>
        </div>
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Dashboard
      </span>
    </div>
  );
};

export default DashboardTopbar;
