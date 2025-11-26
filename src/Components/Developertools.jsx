import { React, useState, useEffect, useContext } from "react";
import hand from "../assets/images/hand.png";

import { X } from "lucide-react";
import { getentitycallbackevent, addentitycallbackevent, deleteentitycallbackevent, updateeteentitycallbackevent } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

import { Theme } from "../Contexts/Theme"


const Developertools = () => {

  const { theme, setTheme } = useContext(Theme)

  const dispatch = useDispatch();
  const [apiKey, setApiKey] = useState("");


  
    const generatePassword = () => {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
      let pass = "";
      for (let i = 0; i < 10; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
     
      setApiKey(pass);
    };
   


  const entitycallbackdata = useSelector((state) => state.entitycallback.entitycallback)
  





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

    if (window.confirm("Are You Sure To Delete Entity")) {
      dispatch(deleteentitycallbackevent(entity.corp_id, entity.callback_event_name))
    } 

   
  }








  const addentity = () => {

    if (window.confirm("Are You Sure To Post Entity")) {
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


   if (window.confirm("Are You Sure To Update Entity")) {
    
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


  }





  return (
    <div className="w-full h-auto font-[Montserrat] space-y-6">

      <div className="relative overflow-hidden rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 shadow-2xl">

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] animate-[slowpan_20s_linear_infinite]"></div>





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


        <img
          className="w-40 md:w-48 h-auto object-contain drop-shadow-lg"
          src={hand}
          alt="Developer Tools"
        />
      </div>


      <div className={`flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-200 rounded-2xl${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl  shadow-lg p-6 hover:shadow-xl transition-all duration-300`}>
        <div className="flex flex-col gap-2">
          <h2 className={`text-lg font-bold ${theme === "dark" ? "text-gray-200" : "text-gray-900"} `}>API Key</h2>
          <p className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-700"} max-w-xl leading-relaxed`}>
            Securely access our banking APIs with your unique API key.
            Authenticate requests, manage transactions programmatically, and
            keep your key private.{" "}
            <a className="underline font-semibold text-indigo-600" href="">
              API Documentation
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={()=>{generatePassword()}} className="px-4 py-2 bg-violet-500 text-white rounded-lg shadow hover:bg-violet-700 transition">
            Regenerate Token
          </button>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input 
              className="py-2 px-3 outline-none text-sm"
              placeholder="XXXXXXXXXX"
              type="text"
              value={apiKey}
            />
            <div onClick={()=>{navigator.clipboard.writeText(apiKey),alert("Api key is copied")}} className="flex items-center justify-center bg-gray-100 px-2 cursor-pointer hover:bg-gray-200 transition">
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

        
          
      <form
  onSubmit={(e) => {
    e.preventDefault();
    isediting ? handelupdate(e) : addentity(e);
  }}
  className={`${open?"fixed":"hidden"} inset-0 bg-black/40 flex items-center justify-center z-50`}
>
  <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] md:w-[400px] relative max-h-[90vh] overflow-y-auto">
 
    <button
      onClick={handelentityopen}
      type="button"
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
    >
      <X />
    </button>

  
    <h2 className={`text-lg  ${theme === "dark" ? "text-black" : "text-gray-900"}  font-bold  mb-4`}>Entity</h2>

    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className={`block  ${theme === "dark" ? "text-black" : "text-gray-900"} text-sm font-medium mb-1`}>
          Call Back Event Name
        </label>
        <select
          value={callbackeventname}
          onChange={(e) => setCallbackeventname(e.target.value)}
          className={` ${theme === "dark" ? "text-black" : "text-gray-900"} w-full px-4 py-2 border border-gray-300 rounded-lg`}
        >
          <option value="Select callback event">Select callback event</option>
          <option value="PAYOUT_EVENT">PAYOUT_EVENT</option>
          <option value="COLLECT_EVENT">COLLECT_EVENT</option>
          <option value="REFUND_EVENT">REFUND_EVENT</option>
          <option value="UPI_EVENT">UPI_EVENT</option>
        </select>
      </div>

      <div>
        <label className={` ${theme === "dark" ? "text-black" : "text-gray-900"} block text-sm font-medium mb-1`}>Call Back URL</label>
        <input
          value={callbackurl}
          onChange={(e) => setCallbackurl(e.target.value)}
          type="text"
          placeholder="http://example"
          className={`w-full px-4 py-2  ${theme === "dark" ? "text-black placeholder:text-black" : "text-gray-900"} border border-gray-300 rounded-lg`}
        />
      </div>

      <div>
        <label className={`${theme === "dark" ? "text-black" : "text-gray-900"} block text-sm font-medium mb-1`}>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={` ${theme === "dark" ? "text-black" : "text-gray-900"} w-full px-4 py-2 border  border-gray-300 rounded-lg`}
        >
          <option value="Select Status">Select Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>
    </div>

    
    <button
      type="submit"
      className="w-full mt-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
    >
      {isediting ? "Update Entity" : "Post Entity"}
    </button>
  </div>
</form>


      <div className={`border flex justify-between border-gray-200 rounded-2xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}  mb-[20px] p-6 hover:shadow-xl transition-all duration-300`}>
        <div className="flex flex-col">
          <h2 className={`text-lg font-bold  ${theme === "dark" ? "text-gray-200" : "text-gray-900"} mb-2`}>Webhooks</h2>
          <p className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
            Receive real-time callbacks for every transaction to automate your
            workflows.{" "}
            <a className="underline font-semibold text-indigo-600" href="">
              Learn more
            </a>
          </p>
        </div>

        <button onClick={handelentityopen} className="px-4 py-1 mr-[50px] bg-blue-700 text-white rounded-lg shadow hover:bg-violet-700 transition">
          Create Entity Request
        </button>



      </div>
{entitycallbackdata&&entitycallbackdata.length>0?  <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-md overflow-hidden">

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
</table>:""}
    

    </div>
  );
};

export default Developertools;
