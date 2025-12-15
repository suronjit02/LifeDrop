import { Link } from "react-router";
import { FaPlusCircle, FaTint, FaUsers } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#05b4cd] text-white p-6 rounded-md">
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="opacity-90">
          Your blood donation can save someone’s life today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <FaTint className="text-3xl text-red-500 mb-2" />
          <h3 className="text-xl font-bold">5</h3>
          <p className="text-gray-500">My Requests</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <MdPendingActions className="text-3xl text-yellow-500 mb-2" />
          <h3 className="text-xl font-bold">2</h3>
          <p className="text-gray-500">Pending Requests</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <FaUsers className="text-3xl text-blue-500 mb-2" />
          <h3 className="text-xl font-bold">120</h3>
          <p className="text-gray-500">Total Donors</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <FaTint className="text-3xl text-green-500 mb-2" />
          <h3 className="text-xl font-bold">3</h3>
          <p className="text-gray-500">Completed Donations</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/dashboard/create-request"
            className="btn bg-[#05b4cd] text-white"
          >
            <FaPlusCircle /> Create Request
          </Link>

          <Link to="/dashboard/my-requests" className="btn btn-outline">
            View My Requests
          </Link>

          <Link to="/dashboard/all-requests" className="btn btn-outline">
            View All Requests
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Recent Requests</h2>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Blood Group</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A+</td>
                <td>Dhaka</td>
                <td className="text-yellow-500 font-semibold">Pending</td>
              </tr>
              <tr>
                <td>B+</td>
                <td>Chattogram</td>
                <td className="text-green-500 font-semibold">Completed</td>
              </tr>
              <tr>
                <td>O+</td>
                <td>Sylhet</td>
                <td className="text-blue-500 font-semibold">Approved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
