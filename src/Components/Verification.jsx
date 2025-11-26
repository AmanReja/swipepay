import React, { useContext, useState } from "react";
import { CheckCircle, XCircle, Upload, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { verify_aadhar } from "../redux/action";
import { Theme } from "../Contexts/Theme";

const Verification = () => {
  
  const {theme,setTheme} = useContext(Theme)
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();

  const handleVerification = (e) => {
    const file = e.target.files[0];
    setAadhaarFile(file);
    dispatch(verify_aadhar(file,setResult));
  };

  const handleVerificationwithnum = () => {
    setLoading(true);
    dispatch(verify_aadhar(aadhaarNumber,setResult));
    setTimeout(() => {
      setLoading(false);
     
    }, 2000);
  };


console.log(32,result);

  return (


    <div className="w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col">
    <main className="w-full h-full flex flex-col overflow-y-scroll">
      <section className="flex flex-col w-full p-4 sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] gap-[30px]">
        <main className="w-full p-6 sm:min-h-[600px] 2xl:h-[780px]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full backdrop-blur-xl shadow-xl rounded-2xl p-6 border ${
              theme === "dark"
                ? "bg-gray-800/80 border-gray-700 text-white"
                : "bg-white/70 border-gray-200 text-gray-900"
            }`}
          >
            <h1 className="text-3xl font-bold">Identity Verification</h1>
            <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
              Verify your identity securely with Aadhaar & PAN.
            </p>
          </motion.div>
  
          
          <div className="flex w-full items-center justify-center gap-6 my-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            {["Enter Details", "Upload Docs", "Verify"].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md">
                  {i + 1}
                </span>
                {step}
                {i < 2 && <div className="h-px w-12 bg-gray-300 dark:bg-gray-600"></div>}
              </div>
            ))}
          </div>
  
       
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full rounded-2xl shadow-lg border p-8 backdrop-blur-md ${
              theme === "dark"
                ? "bg-gray-800/90 border-gray-700 text-white"
                : "bg-white/80 border-gray-200 text-gray-800"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Aadhaar Number
                </label>
                <input
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  type="text"
                  maxLength="12"
                  value={aadhaarNumber}
                  className={`mt-2 block w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
                      : "bg-white text-gray-800 border-gray-300 placeholder:text-gray-400"
                  }`}
                  placeholder="Enter Aadhaar Number"
                />
                <label
                  className={`mt-4 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-400 hover:border-indigo-400 hover:bg-gray-700/50"
                      : "border-gray-300 text-gray-500 hover:border-indigo-400 hover:bg-indigo-50"
                  }`}
                >
                  <Upload size={20} />
                  <span className="mt-2 text-xs">Upload Aadhaar (PDF)</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleVerification}
                  />
                </label>
              </div>
  
             
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  PAN Number
                </label>
                <input
                  type="text"
                  maxLength="10"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value)}
                  className={`mt-2 block w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
                      : "bg-white text-gray-800 border-gray-300 placeholder:text-gray-400"
                  }`}
                  placeholder="Enter PAN Number"
                />
                <label
                  className={`mt-4 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-400 hover:border-indigo-400 hover:bg-gray-700/50"
                      : "border-gray-300 text-gray-500 hover:border-indigo-400 hover:bg-indigo-50"
                  }`}
                >
                  <Upload size={20} />
                  <span className="mt-2 text-xs">Upload PAN (Image/PDF)</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => setPanFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
  
            
            <div className="mt-8 flex justify-end">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleVerificationwithnum}
                disabled={loading}
                className="px-6 py-3 text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Now"
                )}
              </motion.button>
            </div>
          </motion.div>
  
     
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-full max-w-4xl mt-10 rounded-2xl shadow-lg border p-6 mx-auto backdrop-blur-lg ${
                theme === "dark"
                  ? "bg-gray-800/95 border-gray-700 text-white"
                  : "bg-white/90 border-gray-200 text-gray-800"
              }`}
            >
              <h2 className="text-lg font-semibold mb-6">Verification Result</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-4 border rounded-xl flex justify-between items-center shadow-sm ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Aadhaar
                  </p>
                  {result.aadhaar === "Valid" ? (
                    <span className="flex items-center gap-1 text-green-500 font-semibold text-sm">
                      <CheckCircle size={18} /> Valid
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-semibold text-sm">
                      <XCircle size={18} /> Invalid
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </section>
    </main>
  </div>
  

   
  );
};

export default Verification;
