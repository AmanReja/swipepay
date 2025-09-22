import { useState } from "react";
import { ShieldCheck, Smartphone, Lock, X } from "lucide-react";
import { forgotpassword } from "../redux/action";
import { useDispatch,useSelector } from "react-redux";



const Security = () => {
  const [open2FA, setOpen2FA] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [passopen, setPassopen] = useState(false);
  const [updatedpass, setUpdatedpass] = useState("");
 
  const dispatch = useDispatch();

  const handelpassopen = ()=>{
    
    setPassopen((prev)=>!prev)
  }


  const passupdate = (e)=>{
    e.preventDefault()
    try {
    
        const oldpass = {
            new_password:updatedpass
        }
        dispatch(forgotpassword(oldpass))
    } catch (error) {
        alert(error)
        
    }finally{
        setUpdatedpass("")
        setPassopen(false)
        

    }
   
  }



  return (
    <div className="w-full h-auto font-[Montserrat] space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 shadow-2xl">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]"></div>

        <div className="flex flex-col gap-4 text-center md:text-left max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Security Settings
          </h1>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Protect your account with advanced security features including
            two-factor authentication, password controls, and device management.
          </p>
        </div>

        <ShieldCheck className="w-24 h-24 text-indigo-300 drop-shadow-lg" />
      </div>

      {/* Change Password */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-200 rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-600" />
            Change Password
          </h2>
          <p className="text-sm text-gray-700">
            Update your password regularly to keep your account secure.
          </p>
        </div>
        <button onClick={handelpassopen} className="px-4 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 transition">
          Update Password
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-200 rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-indigo-600" />
            Two-Factor Authentication (2FA)
          </h2>
          <p className="text-sm text-gray-700">
            Add an extra layer of security by requiring a code when you sign in.
          </p>
        </div>
        <button
          onClick={() => setOpen2FA(true)}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 transition"
        >
          Enable 2FA
        </button>
      </div>

      {/* Trusted Devices */}
      <div className="border border-gray-200 rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Trusted Devices</h2>
          <button
            onClick={() => setOpenDevice(true)}
            className="px-4 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Manage
          </button>
        </div>

        <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-md overflow-hidden">
          <thead className="text-[11px] text-gray-500 uppercase bg-[#f9f9f9] border-b border-gray-300">
            <tr>
              <th className="px-4 py-3">Device</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Last Active</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px] font-medium">
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
              <td className="px-4 py-4">Chrome on Windows</td>
              <td className="px-4 py-4">New Delhi, India</td>
              <td className="px-4 py-4">2 hours ago</td>
              <td className="px-4 py-4">
                <button className="bg-red-500 px-3 py-1 text-white rounded-md">
                  Remove
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
              <td className="px-4 py-4">Safari on iPhone</td>
              <td className="px-4 py-4">Mumbai, India</td>
              <td className="px-4 py-4">Yesterday</td>
              <td className="px-4 py-4">
                <button className="bg-red-500 px-3 py-1 text-white rounded-md">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal - Enable 2FA */}
      {passopen && (
        <form  className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] md:w-[400px] relative">
            <button
              onClick={handelpassopen}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
            <h2 className="text-lg font-bold mb-4">Update Password</h2>
            <p className="text-sm text-gray-600 mb-4">
               Enter your updated password
              below to update your password.
            </p>
            <input required onChange={(e)=>{setUpdatedpass(e.target.value)}}
              type="text"
              value={updatedpass}
              placeholder="Enter updated pass"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <button type="submit" className="w-full py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
              Confirm
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Security;
