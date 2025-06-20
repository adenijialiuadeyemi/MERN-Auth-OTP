import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
      toast.success("User logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex items-center justify-between absolute top-0 sm:p-6 sm:px-24">
      <img src={assets.logo} className="w-28 sm:w-32" />

      {userData ? (
        <div className="w-8 h-8 rounded-full bg-black text-white flex justify-center items-center relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none p-2 m-0 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer "
                  onClick={sendVerificationOtp}
                >
                  Verify Email
                </li>
              )}

              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border-gray-500 border rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer transition-all"
        >
          Login <img src={assets.arrow_icon} className="w-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
