import React, { useState, useEffect } from "react";
import { frameData, motion } from "framer-motion";
import Offers from "./Offers";
import { toast, Toaster } from "sonner";
import { addcompany } from "../redux/action";
import { useDispatch } from "react-redux";
const Addnewcompany = ({ theme }) => {


  const dispatch = useDispatch()


  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  const [isModelOpen, setIsModelOpen] = useState(false);

  // --------------------------
  // FORM STATE
  // --------------------------
  const [formData, setFormData] = useState({
  
    country: "India",
    isBranch: false,
    orgName: "",
    companyName: "",
    phoneCode: "+91",
    phone: "",
    email: "",
    gst: "",
    address1: "",
    address2: "",
    pincode: "",
    city: "",
    state: "",
    finalCountry: "India",
  });
  const [logoFile, setLogoFile] = useState(null);
  // Handle text/select input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Branch Toggle
  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isBranch: !prev.isBranch,
    }));
  };

  // Handle Logo Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file); // send to backend directly
    }
  };
  // Submit Function
  const handleSubmit = async () => {

    const fd = new FormData();
  
    fd.append("company_name", formData.companyName);
    fd.append("organization_name", formData.orgName);
    fd.append("country", formData.country);
    fd.append("company_phone", formData.phone);
    fd.append("company_email", formData.email);
    fd.append("gstin", formData.gst);
    fd.append("address_line1", formData.address1);
    fd.append("address_line2", formData.address2);
    fd.append("city", formData.city);
    fd.append("state", formData.state);
    fd.append("pincode", formData.pincode);
  
    // FILE APPEND — must match upload.single("logo")
    fd.append("logo", logoFile);
  
    toast.info("Saving company...");
    for (let pair of fd.entries()) {
      console.log(pair[0] + ": ", pair[1]);
    }
    try {
      // If you're using redux-thunk or redux-toolkit-thunk
      dispatch(addcompany(fd));
    } catch (err) {
      toast.error("Error connecting to server");
    }
  };
  

  // Login toast
  useEffect(() => {
    const shouldShow = localStorage.getItem("showLoginToast");

    if (shouldShow === "true") {
      toast.success("🚀 Login success!", { duration: 2500 });
      localStorage.removeItem("showLoginToast");
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        className={`flex ${
          isModelOpen ? "p-4" : ""
        } duration-300 flex-col gap-[20px] overflow-y-auto h-auto py-[10px]`}
      >
        <Offers />

        <motion.div
          variants={fade}
          className={`w-full bg-white rounded-lg ${
            theme === "dark" ? "text-gray-100 bg-gray-900" : "text-gray-900"
          }`}
        >
          <div
            className={`flex flex-col rounded-[10px] p-4 ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            {/* START FORM */}
            <div className="w-full">
              <h2 className="text-lg font-semibold mb-4">Add New Company</h2>

              <div className="grid grid-cols-12 gap-6">
                {/* Left Labels */}
                <div className="col-span-3 flex flex-col gap-6 text-[13px] text-gray-500">
                  <p>Logo (OPTIONAL) :</p>
                  <p>Select Country :</p>
                  <p>Is Branch? :</p>
                  <p className="text-red-500 font-medium">*Organization Name :</p>
                  <p className="text-red-500 font-medium">*Company Name s:</p>
                  <p>Company Phone (OPTIONAL) :</p>
                  <p>Company Email (OPTIONAL) :</p>
                  <p>GSTIN (OPTIONAL) :</p>
                  <p>Company Address :</p>
                </div>

                {/* Right Fields */}
                <div className="col-span-9 flex flex-col gap-5">
                  {/* Upload Logo */}
                  <label className="w-[110px] h-[110px] border border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      name="logo"
                      onChange={(e)=>{handleImageUpload(e)}}
                    />
                    <span className="text-xl font-bold">+</span>
                    <p className="text-[12px] mt-1">Upload Logo</p>
                  </label>

                  {/* Country */}
                  <select
                    name="country"
                    onChange={handleChange}
                    value={formData.country}
                    className="w-[250px] border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>

                  {/* Branch Toggle */}
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isBranch}
                        onChange={handleToggle}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
                      <div className="absolute left-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition"></div>
                    </label>

                    <p className="text-sm text-gray-600">
                      This is branch of an existing company.
                      <span className="ml-1 text-blue-600 underline cursor-pointer">
                        Talk to a specialist
                      </span>
                    </p>
                  </div>

                  {/* Organization */}
                  <input
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleChange}
                    type="text"
                    placeholder="SWIGGY"
                    className="w-[400px] border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />

                  {/* Company Name */}
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    type="text"
                    placeholder="NEXTSPEED TECHNOLOGIES PRIVATE LIMITED"
                    className="w-[400px] border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <select
                      name="phoneCode"
                      value={formData.phoneCode}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option>+91</option>
                    </select>

                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="text"
                      placeholder="Company Phone Number"
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[250px]"
                    />
                  </div>

                  {/* Email */}
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Company Email Address"
                    className="w-[400px] border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />

                  {/* GST */}
                  <div className="flex gap-3">
                    <input
                      name="gst"
                      value={formData.gst}
                      onChange={handleChange}
                      type="text"
                      placeholder="29AABCT1332L000"
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[260px]"
                    />
                    <button className="bg-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-300">
                      Fetch Details
                    </button>
                  </div>

                  {/* Address Row 1 */}
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      name="address1"
                      onChange={handleChange}
                      value={formData.address1}
                      type="text"
                      placeholder="Address Line 1"
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                    <input
                      name="address2"
                      onChange={handleChange}
                      value={formData.address2}
                      type="text"
                      placeholder="Address Line 2"
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                    <input
                      name="pincode"
                      onChange={handleChange}
                      value={formData.pincode}
                      type="text"
                      placeholder="Pincode"
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  {/* Address Row 2 */}
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      name="city"
                      onChange={handleChange}
                      value={formData.city}
                      type="text"
                      placeholder="City"
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />

                    <select
                      name="state"
                      onChange={handleChange}
                      value={formData.state}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">Select State</option>
                      <option>Karnataka</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                    </select>

                    <select
                      name="finalCountry"
                      onChange={handleChange}
                      value={formData.finalCountry}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option>India</option>
                    </select>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSubmit}
                    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md text-sm w-fit hover:bg-blue-700"
                  >
                    Save & Update
                  </button>
                </div>
              </div>
            </div>
            {/* END FORM */}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Addnewcompany;
