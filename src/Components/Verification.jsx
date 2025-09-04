import React, { useState } from "react";
import { CheckCircle, XCircle, Upload, Loader2 } from "lucide-react";
import {verify_aadhar} from "../redux/action"
import { useDispatch } from "react-redux";

const Verification = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch()

  
  const handleVerification = async (e) => {
    const file = e.target.files[0]


    

    console.log(22,file);
    dispatch(verify_aadhar(file))
    
  
  };
  
  const handleVerificationwithnum = async (e) => {

   

    

    dispatch(verify_aadhar(aadhaarNumber))
    console.log(aadhaarNumber);
    
  
  };

  return (
    <div className=" w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col">
     
      <main className="w-[100%] p-2 px-[50px] sm:min-h-[600px] 2xl:h-[780px]  sm:h-[600px]">
      <div className="w-full  bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 mb-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Identity Verification</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your Aadhaar & PAN details, upload documents, and verify your identity securely.
        </p>
      </div>

   
      <div className="flex w-full items-center justify-center gap-6 mb-8 text-sm font-medium text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">1</span>
          Enter Details
        </div>
        <div className="h-px w-12 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">2</span>
          Upload Docs
        </div>
        <div className="h-px w-12 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">3</span>
          Verify
        </div>
      </div>

   
      <div className="w-full   bg-white h-auto min-h-[220px] backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
          <div>

            
            <label className="block text-sm font-semibold text-gray-700">Aadhaar Number</label>
            <input onChange={(e)=>{setAadhaarNumber(e.target.value)}}
              type="text"
              maxLength="12"
              
             
             value={aadhaarNumber}
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Aadhaar Number"
            />
            <label className="mt-3 flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <Upload size={16} />
            
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) =>handleVerification(e)}
              />
            </label>
          </div>

      
          <div>
            <label className="block text-sm font-semibold text-gray-700">PAN Number</label>
            <input
              type="text"
              maxLength="10"
              value={""}
              
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter PAN Number"
            />
            <label className="mt-3 flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <Upload size={16} />
        
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                
              />
            </label>
          </div>
        </div>

   
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleVerificationwithnum}
            disabled={loading}
            className="px-6 py-2 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Now"
            )}
          </button>
        </div>
      </div>

   
      {result && (
        <div className="w-full max-w-4xl mt-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Verification Result</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">Aadhaar</p>
              {result.aadhaar === "Valid" ? (
                <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                  <CheckCircle size={16} /> Valid
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-600 font-semibold text-sm">
                  <XCircle size={16} /> Invalid
                </span>
              )}
            </div>
            <div className="p-4 border rounded-lg flex justify-between items-center">
              <p className="text-sm font-medium text-gray-600">PAN</p>
              {result.pan === "Valid" ? (
                <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                  <CheckCircle size={16} /> Valid
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-600 font-semibold text-sm">
                  <XCircle size={16} /> Invalid
                </span>
              )}
            </div>
          </div>
        </div>
      )}
        
      </main>
     
    </div>
  );
};

export default Verification;
