import { React, useState, useEffect } from "react";
import hand from "../assets/images/hand.png";
import Subfooter from "./Subfooter";
import { X } from "lucide-react"
import { getentitycallbackevent, addentitycallbackevent, deleteentitycallbackevent, updateeteentitycallbackevent } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Developertools = () => {

  const dispatch = useDispatch();




  const entitycallbackdata = useSelector((state) => state.entitycallback.entitycallback)
  // console.log(10, entitycallbackdata);





  useEffect(() => {
    dispatch(getentitycallbackevent())

  }, [dispatch])



  const [callbackeventname, setCallbackeventname] = useState("");
  const [callbackurl, setCallbackurl] = useState("")
  const [isediting, setIsediting] = useState(false)
  const [status, setStatus] = useState("")
  const [open, setOpen] = useState(false)
  const [entpra_corp, setEntpra_corp] = useState("")
  const [entpra_envname, setEntpra_envname] = useState("")
  const [entpra_envstatus, setEntpra_envstatus] = useState("")


  const handelentityopen = () => {

    setOpen((prev) => !prev)
  }


  const handelentitydelete = (entity) => {
    dispatch(deleteentitycallbackevent(entity.corp_id, entity.callback_event_name))
  }








  const addentity = () => {
    try {

      if (!callbackeventname || !callbackurl || !status) {
        alert("all fields are required")
      } else {


        const newEntity = {
          callback_event_name: callbackeventname,
          callback_url: callbackurl,
          status: status,

        }; dispatch(addentitycallbackevent(newEntity))

      }
    } catch (error) {
      alert(error)

    } finally {
      setCallbackeventname("")
      setCallbackurl("")
      setStatus("")

    }






  }


  const update = (entity) => {
    setCallbackeventname(entity.callback_event_name)
    setCallbackurl(entity.callback_url)
    setStatus(entity.status)
    setIsediting(true)
    setOpen(true)
    setEntpra_corp(entity.corp_id)
    setEntpra_envname(entity.callback_event_name)
    setEntpra_envstatus(entity.status)
   
    
  };



  const handelupdate = () => {
    // console.log(55,entity.corp_id,entity.callback_event_name, entity.status);

    try {
    
     
      
      
     

      const oldEntity = {

          new_callback_event_name: callbackeventname,
          new_callback_url: callbackurl,
          new_status: status,

      };
      dispatch(updateeteentitycallbackevent(oldEntity, entpra_corp, entpra_envname, entpra_envstatus))
    } catch (error) {
      alert(error)
    } finally {

      setCallbackeventname("")
      setCallbackurl("")
      setStatus("")
      setIsediting(false)
      setEntpra_corp("")
    setEntpra_envname("")
    setEntpra_envstatus("")
    }



  }





  return (
    <div className="w-full h-auto font-[Montserrat] space-y-6">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 shadow-2xl">

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] animate-[slowpan_20s_linear_infinite]"></div>

        {/* Glow Overlay */}


        {/* Text Content */}
        <div className="flex flex-col gap-4 text-center md:text-left max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Developer Controls
          </h1>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Access powerful developer tools including API keys, whitelists, and
            webhooks for secure integrations. Check our{" "}
            <a
              className="underline font-semibold text-blue-300 hover:text-blue-200"
              href=""
            >
              API Documentation
            </a>{" "}
            for smooth implementation and deeper technical details.
          </p>
        </div>

        {/* Image */}
        <img
          className="w-40 md:w-48 h-auto object-contain drop-shadow-lg"
          src={hand}
          alt="Developer Tools"
        />
      </div>

      {/* API Key Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-200 rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-900">API Key</h2>
          <p className="text-sm text-gray-700 max-w-xl leading-relaxed">
            Securely access our banking APIs with your unique API key.
            Authenticate requests, manage transactions programmatically, and
            keep your key private.{" "}
            <a className="underline font-semibold text-indigo-600" href="">
              API Documentation
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-violet-500 text-white rounded-lg shadow hover:bg-violet-700 transition">
            Regenerate Token
          </button>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input
              className="py-2 px-3 outline-none text-sm"
              placeholder="XXXXXXXXXX"
              type="text"
            />
            <div className="flex items-center justify-center bg-gray-100 px-2 cursor-pointer hover:bg-gray-200 transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10 8V7C10 6.057 10 5.586 10.293 5.293C10.586 5 11.057 5 12 5H17C17.943 5 18.414 5 18.707 5.293C19 5.586 19 6.057 19 7V12C19 12.943 19 13.414 18.707 13.707C18.414 14 17.943 14 17 14H16M7 19H12C12.943 19 13.414 19 13.707 18.707C14 18.414 14 17.943 14 17V12C14 11.057 14 10.586 13.707 10.293C13.414 10 12.943 10 12 10H7C6.057 10 5.586 10 5.293 10.293C5 10.586 5 11.057 5 12V17C5 17.943 5 18.414 5.293 18.707C5.586 19 6.057 19 7 19Z"
                  stroke="#464455"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => { isediting ? handelupdate(e) : addentity(e), e.preventDefault() }} className={`space-y-6 absolute ${!open ? "hidden" : "block"}  top-[60%] right-[3%] bg-white p-6 z-40 rounded-2xl`}>
        <div className="flex justify-center items-center"> <h1 className="text-center font-bold text-3xl">Entity</h1>
          <div onClick={handelentityopen} className="relative left-[30%] bg-violet-300 w-[50px] h-[30px] flex justify-center items-center rounded-2xl shadow-2xl"><X className="text-white" /></div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Call Back Event Name</label>
            <select value={callbackeventname} onChange={(e) => { setCallbackeventname(e.target.value) }} name="callbackeventname" className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-white" >

            <option selected value="Select callback event">Select callback event</option>
              <option  value="payout_failed">payout_failed</option>

              <option value="payout_pending">payout_pending</option>

            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Call Back URL</label>
            <input value={callbackurl} onChange={(e) => { setCallbackurl(e.target.value) }} type="text" name="url" placeholder="http://example" className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"  />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={status} onChange={(e) => { setStatus(e.target.value) }} name="callbackeventname" className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-white" >

              <option selected value="Select Status">Select Status</option>
              <option  value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>

            </select>
          </div>

        </div>



        <div>
          <button type="submit" className="w-full py-3 px-6 bg-violet-600 text-white font-medium rounded-lg shadow-sm hover:bg-violet-700 transition duration-300">
            Post Entity
          </button>
        </div>
      </form>

      <div className="border flex justify-between border-gray-200 rounded-2xl bg-white mb-[20px] p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Webhooks</h2>
          <p className="text-sm text-gray-700">
            Receive real-time callbacks for every transaction to automate your
            workflows.{" "}
            <a className="underline font-semibold text-indigo-600" href="">
              Learn more
            </a>
          </p>
        </div>

        <button onClick={handelentityopen} className="px-4 py-1 mr-[50px] bg-blue-700 text-white rounded-lg shadow hover:bg-violet-700 transition">
          create a entity request
        </button>



      </div>

      <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-md overflow-hidden">
        <thead className="text-[11px] text-gray-500 uppercase bg-[#f9f9f9] border-b border-gray-300">
          <tr>
            <th className="px-4 py-3">Corp id</th>
            <th className="px-4 py-3">
              <div className="flex items-center space-x-1">
                <p>Callback event</p>
                <div className="flex flex-col justify-center items-center leading-none">
                
                </div>
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex items-center space-x-1">
                <p>Callback Url</p>
                <div className="flex flex-col justify-center items-center leading-none">
                 
                </div>
              </div>
            </th>
            <th className="px-4 py-3">Date</th>

            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>



        <tbody className="text-[13px] font-medium">
          {entitycallbackdata?.map((entity, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="px-4 py-4 align-top">
                {entity.corp_id}
              </td>

              <td className="px-4 py-4">{entity.callback_event_name}</td>

              <td className="px-4 py-4">
                {
                  entity.callback_url
                }
              </td>

              <td className="px-4 py-4"> {
                entity.create_on

          }</td>

              <td className="px-4 py-4">
                {
                  entity.status

                }
              </td>
              <td className="px-4 py-4 flex gap-[5px]">
                <button onClick={(e) => { handelentitydelete(entity) }} className="bg-red-500 p-2 text-white rounded-[5px]">DELETE</button>
                <button onClick={(e) => { update(entity) }} className="bg-yellow-500 p-2 text-white rounded-[5px]">UPDATE</button>

              </td>


            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Developertools;
