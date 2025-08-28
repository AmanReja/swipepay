import React, { useState } from "react";
import { CheckCircle, XCircle, Upload, Loader2 } from "lucide-react";

const Verification = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Mock API call
  const handleVerification = async () => {
    if (!aadhaarNumber || !panNumber) {
      alert("⚠️ Please enter Aadhaar & PAN number");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setResult({
        aadhaar: aadhaarNumber === "123456789012" ? "Valid" : "Invalid",
        pan: panNumber.toUpperCase() === "ABCDE1234F" ? "Valid" : "Invalid",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className=" w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col">
      {/* Header */}
      <main className="w-[100%] p-2 px-[50px] sm:min-h-[600px] 2xl:h-[780px]  sm:h-[600px]">
      <div className="w-full  bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 mb-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Identity Verification</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your Aadhaar & PAN details, upload documents, and verify your identity securely.
        </p>
      </div>

      {/* Step Indicator */}
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

      {/* Form Section */}
      <div className="w-full  bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Aadhaar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Aadhaar Number</label>
            <input
              type="text"
              maxLength="12"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/, ""))}
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Aadhaar Number"
            />
            <label className="mt-3 flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <Upload size={16} />
              <span>{aadhaarFile ? aadhaarFile.name : "Upload Aadhaar File"}</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => setAadhaarFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* PAN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">PAN Number</label>
            <input
              type="text"
              maxLength="10"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter PAN Number"
            />
            <label className="mt-3 flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <Upload size={16} />
              <span>{panFile ? panFile.name : "Upload PAN File"}</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => setPanFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        {/* Verify Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleVerification}
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

      {/* Result */}
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
