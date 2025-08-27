import React, { useEffect,useState ,useRef} from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data,Payout_report,get_collections } from "../redux/action";
import "../App.css"
import "flatpickr/dist/themes/airbnb.css"; 
import flatpickr from "flatpickr"

const collection = () => {
  const [load,setLoad] = useState(false);
  const [searchtr, setSearchtr] = useState("");
  const [trstatus, setTrstatus] = useState("");
  const [formdatastr,setFormdatastr]=useState("")
  const [formdataend,setFormdataend]=useState("")


 
  const[date,setDate] =useState({startDate:null,endDate:null})


  const formatDate = (date) => new Intl.DateTimeFormat("en-CA").format(date);


  useEffect(() => {
    if (date.startDate && date.endDate) {
      setFormdatastr(formatDate(date.startDate));
      setFormdataend(formatDate(date.endDate));
    }
  }, [date]);





  
  const dateRangeRef = useRef(null);

  useEffect(() => {
    flatpickr(dateRangeRef.current, {
      mode: "range",
      dateFormat: "y-m-d", 
      defaultDate: ["15-07-2025", "16-07-2025"],
      value:date,
      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          const [start, end] = selectedDates;
          setDate({ startDate: start, endDate: end });
        }
      }
    });
  }, []);




  const dispatch = useDispatch();
  const payoutdata = useSelector((state) => state.payoutlog.payoutlog.data);
  const payoutreportdata = useSelector((state) => state.payoutreport.payoutreport);
  const collectionsdata = useSelector((state) => state.collections.collections.transactions
  );
  
console.log(22,collectionsdata);



  const handeldownload = () => {
    dispatch(getall_payoutlog_data(searchtr, trstatus, formdatastr, formdataend, true));
  };
  




  useEffect(() => {

   async function fetchdata() {
      setLoad(true)

   await dispatch(getall_payoutlog_data(searchtr,trstatus,formdatastr,formdataend));
   await dispatch(Payout_report())
   await dispatch(get_collections())
    setLoad(false)
    }fetchdata()
    
  }, [dispatch,searchtr,trstatus,formdatastr,formdataend]);


 
   
  return (
    <div className=" w-[100%] rounded-2xl 2xl:h-[85%] h-[80%] flex flex-col">
      <main className="w-full h-full flex flex-col overflow-y-scroll">
      <section className="w-full px-5 mt-5">
      <div className="w-full h-[80px]  bg-white flex items-center px-5 ">
  <div className="flex gap-[5px] h-full items-center w-full">
    
    <h1 className="text-xl content-center font-semibold text-gray-800">Collection Report</h1>

    <div className="flex items-center text-sm text-gray-500 space-x-1 mt-1 sm:mt-0">
      <a href="#" className="hover:underline text-gray-400">Home</a>
      <span>/</span>
      <a href="#" className="hover:underline text-gray-400">Report</a>
      <span>/</span>
      <span className="text-gray-700 font-medium">collection Report</span>
    </div>

  </div>
</div>

  <div className="flex flex-col sm:flex-row gap-5 bg-white  rounded-xl p-5">
    {[
      { label: 'Payout Value', value: payoutreportdata.
      total_payout_value
      
      ||"00" },
      { label: 'Success Rate', value: `${payoutreportdata.success_rate==undefined?"00":payoutreportdata.success_rate+"%"}` || "00"},
      { label: 'Pending Payouts', value: payoutreportdata.pending_value ||"00" },
      { label: 'Failure', value: payoutreportdata.failed_value ||"00"},
    ].map((item, index) => (
      <div
        key={index}
        className="flex-1 flex flex-col items-center justify-center text-center  rounded-lg p-4 shadow-sm hover:shadow-md transition"
      >
        <h1 className="text-2xl font-semibold text-gray-800">{item.value}</h1>
        <p className="text-sm text-gray-500 mt-1">{item.label}</p>
      </div>
    ))}
  </div>
</section>





 <div className="w-full px-[20px] mt-[20px]">
          <div className="flex w-[100%] h-full flex-col border-gray-100 border-[1px] bg-white rounded-xl   overflow-y-auto">
           
          <div className="flex justify-between items-center p-4 w-full flex-wrap gap-4 bg-white shadow-sm rounded-md">
  {/* Title */}
  <h2 className="text-lg font-semibold text-gray-800">
    Collection Report
  </h2>

  {/* Controls */}
  <div className="flex gap-3 flex-wrap items-center">
    {/* Date Picker */}
    <div className="border-gray-300 pl-[5px] border-[1px] p-1 rounded flex justify-center items-center gap-2" >
    <i class="fa-solid fa-calendar-days text-gray-300"></i>
    <input className="w-[180px] text-[14px]  content-center justify-center text-gray-400 outline-none  rounded" type="text" ref={dateRangeRef} />
    </div>


    {/* Search with icon */}
    <div className="relative border border-gray-300 px-2 py-1 rounded-lg bg-white">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input onChange={(e)=>{setSearchtr(e.target.value)}}
        type="text"
        placeholder="Search transaction"
        className="pl-8 pr-2 outline-none text-sm text-gray-700 bg-transparent"
      />
    </div>

    {/* Select dropdown */}
    <div className="border border-gray-300 px-4 py-1 rounded-lg bg-white">
      <select onChange={(e)=>{
        setTrstatus(e.target.value)
      }} className="text-sm text-gray-700 bg-transparent outline-none">
        <option selected value="All">All Transactions</option>
        <option value="SUCCESS">Success</option>
        <option value="PENDING">Pending</option>
        <option value="FAILED" >Failed</option>
      </select>
    </div>

    {/* Download button */}
    <button onClick={handeldownload} className="text-sm font-medium text-gray-700  hover:shadow-xl border-gray-300 border-1  px-4 py-1 rounded-lg transition">
      <span><i class="fa-solid fa-download text-gray-400"></i></span>Download
    </button>
  </div>
</div>



       {!load? <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-[11px] text-gray-400 uppercase border-b bg-gray-50 border-gray-300 border-t">
                <tr>
                  <th className="px-4 py-3">#Status</th>
                  <th className="px-4 py-3">
  <div className="flex items-center space-x-1">
    <p>Txn Date</p>
    <div className="flex flex-col justify-center items-center leading-none">
      <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#1f1f1f" className="-mb-[4px]">
        <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#1f1f1f" className="-mt-[4px]">
        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
      </svg>
    </div>
  </div>
</th>

                  <th className="px-4 py-3"> <div className="flex items-center space-x-1">
    <p>UTR</p>
    <div className="flex flex-col justify-center items-center leading-none">
      <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#dbdad7" className="-mb-[4px]">
        <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#1f1f1f" className="-mt-[4px]">
        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
      </svg>
    </div>
  </div></th>
                  <th className="px-4 py-3"> <div className="flex items-center space-x-1">
    <p>Account Details</p>
    <div className="flex flex-col justify-center items-center leading-none">
      <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#1f1f1f" className="-mb-[4px]">
        <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#dbdad7" className="-mt-[4px]">
        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
      </svg>
    </div>
  </div></th>
                  <th className="px-4 py-3"><div className="flex items-center space-x-1">
    <p>Amount</p>
    <div className="flex flex-col justify-center items-center leading-none">
      <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#1f1f1f" className="-mb-[4px]">
        <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#dbdad7" className="-mt-[4px]">
        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
      </svg>
    </div>
  </div></th>
   
                </tr>
              </thead>
              <tbody className="text-[12px] font-semibold">
                {collectionsdata?.map((txn, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <span
                        className={`text-white rounded-[3px] px-[13px] py-[2px] text-center content-center min-w-[80px] h-[5px] w-[80px] font-bold text-[12px] ${
                          txn.status
                          === "success"
                            ? "bg-green-400"
                            : txn.status === "pending"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-5">{txn.date}</td>
                    <td className="px-4 py-5">
                    <div className="flex flex-col">
                      <p>UTR:{txn.utr}</p>
                      <p>[request ID:#{txn.transaction_id
}]</p>
                    </div>
                    </td>
                    <td className="px-4 py-5">
                    <div className="flex flex-col">
                      <p>A/C:{txn.remitter_acc_number


}</p>
                      <p>[IFSC Code:{txn.remitter_ifsc_code}]</p>
                    </div>
                    </td>
                    <td className="px-4 py-5">
                      {txn.amount}
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>:<div className="flex w-full h-[200px] justify-center items-center">
              
              <div className="loader"></div>
              </div>} 
           
           
          </div>
        </div>

       
      </main>
    </div>
  );
};

export default collection;
