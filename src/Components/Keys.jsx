
import { React, useEffect ,useContext} from "react";
import Hdfc from "../assets/images/HDFC.png";
import Chart from "./Chart";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import bg3 from "../assets/images/bg-3.png";
import Subfooter from "./Subfooter";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data,getall_wallet_company_data,get_vertualaccountdetails} from "../redux/action";
import {BadgeCheck,ArrowDownLeft,ArrowUpRight,CreditCard} from "lucide-react"

import { CheckCircle, XCircle, Upload, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { verify_aadhar } from "../redux/action";
import { Theme } from "../Contexts/Theme";




const Keys = ({
  type = "Virtual Debit Card",
  holder = "John Doe",
  number = "**** **** **** 1234",
  expiry = "12/27",
  network = "Visa",
  color = "from-indigo-500 to-purple-600",
}) => {

  const {theme,setTheme}=useContext(Theme)



  const dispatch = useDispatch();
  const payoutdata = useSelector((state) => state.payoutlog.payoutlog.data);
  const walletdata = useSelector((state) => state.walletcompany.walletcompany.total);
  const vaaccountdata = useSelector((state) => state.vaaccount.vaaccount);
  console.log(18,vaaccountdata);
  



  useEffect(() => {
    dispatch(getall_payoutlog_data())
    dispatch(getall_wallet_company_data())
    dispatch(get_vertualaccountdetails())
    
  }, [dispatch]);


  const totallpayouts = payoutdata?.length;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const loginSuccess = params.get("login");

  const sucesslog = () => {
    if (loginSuccess === "success") {
      toast.success("🦄 log success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };
  useEffect(() => {
    sucesslog();
  }, [loginSuccess]);

  const icons = [
    {
      icon: <ArrowUpRight size={44}  className="text-gray-600"/>,
      num: totallpayouts,
      text: "Payouts",
      deg: "-50deg",
    },
    {
      icon: <ArrowDownLeft size={44}  className="text-gray-600"/>,
      num: 0,
      text: "Collection",
      deg: "130deg",
    },
    {
      icon: <CreditCard size={44} className="text-gray-600" />,
      num: 0,
      text: "Cards Created",
      deg: "0deg",
    },
    {
      icon: <BadgeCheck size={44} className="text-gray-600"/>,
      num: 0,
      text: "Identity Verified",
      deg: "0deg",
    },
  ];

  return (
    
    <>
      
      <div className="w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col">
    <main className="w-full h-full flex flex-col overflow-y-scroll">
      <section className="flex flex-col w-full h-[900px] p-6 sm:min-h-[800px] 2xl:h-[780px] gap-10">
        
        {/* Secret Key Box */}
        <div className="flex items-center justify-between p-5 bg-white/60 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-xl">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Secret Key</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-56 font-mono">
              sk_live_abcdef1234567890
            </p>
          </div>
          <button className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition">
            Copy
          </button>
        </div>
  
        {/* Generate Key */}
        <div>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition">
            Generate New Key
          </button>
        </div>
  
        {/* Virtual Card */}
       
      </section>
    </main>
  </div>
    </>
  );
};

export default Keys;
















// const search = req.query.search ? %${req.query.search}% : null;
//     const status =
//       req.query.status && req.query.status.toUpperCase() !== "ALL"
//         ? req.query.status.toUpperCase()
//         : null;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const offset = (page - 1) * limit;

  
//     let baseSql = "FROM col_customer_master WHERE LOWER(company_id) = LOWER(?)";
//     const baseParams = [companyId];

    
//     if (search) {
//       baseSql +=
//         " AND (name LIKE ? OR mobile LIKE ? OR account_number LIKE ? OR account_id LIKE ?)";
//       baseParams.push(search, search, search, search);
//     }

 
//     if (status) {
//       baseSql += " AND status = ?";
//       baseParams.push(status);
//     }


//     if (req.query.start_date && req.query.end_date) {
//       baseSql += " AND create_on BETWEEN ? AND ?";
//       baseParams.push(
//         req.query.start_date + " 00:00:00",
//         req.query.end_date + " 23:59:59"
//       );
//     }
//     return res.status(200).json({
//       pagination: {
//         totalRecords,
//         totalPages,
//         currentPage: page,
//         limit,
//       },
//       count: rows.length,
//       data: rows.map((r) => ({
//         id: r.id,
//         company_id: r.company_id,
//         name: r.name,
//         account_id: r.account_id,
//         account_number: r.account_number,
//         ifsc_code: r.ifsc_code,
//         email: r.email,
//         mobile: r.mobile,
//         purpose: r.purpose,
//         validity: r.validity,
//         create_on: r.create_on,
//         update_on: r.update_on,
//         create_by: r.create_by,
//         update_by: r.update_by,
//         status: r.status,
//         remark: r.remark,
//       })),
//     });
//   } catch (err) {
//     console.error("customer master error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// router.get("/customer/master", authMiddleware, async (req, res) => {
//   try {
//     const loginId = req.user?.login_id;
//     if (!loginId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

    
//     const [userResult] = await connection.execute(
//       "SELECT company_id FROM api_dashboard_user WHERE login_id = ?",
//       [loginId]
//     );

//     if (userResult.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const companyId = userResult[0].company_id;

  
//     const search = req.query.search ? %${req.query.search}% : null;
//     const status =
//       req.query.status && req.query.status.toUpperCase() !== "ALL"
//         ? req.query.status.toUpperCase()
//         : null;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const offset = (page - 1) * limit;

  
//     let baseSql = "FROM col_customer_master WHERE LOWER(company_id) = LOWER(?)";
//     const baseParams = [companyId];

    
//     if (search) {
//       baseSql +=
//         " AND (name LIKE ? OR mobile LIKE ? OR account_number LIKE ? OR account_id LIKE ?)";
//       baseParams.push(search, search, search, search);
//     }

 
//     if (status) {
//       baseSql += " AND status = ?";
//       baseParams.push(status);
//     }


//     if (req.query.start_date && req.query.end_date) {
//       baseSql += " AND create_on BETWEEN ? AND ?";
//       baseParams.push(
//         req.query.start_date + " 00:00:00",
//         req.query.end_date + " 23:59:59"
//       );
//     }


// if (req.query.download && req.query.download.toLowerCase() === "excel") {
//   const [customers] = await connection.execute(
//     SELECT * ${baseSql} ORDER BY id DESC,
//     baseParams
//   );

//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet("Customer Master");

//   // === Title ===
//   worksheet.mergeCells("B1:K1");
//   const titleCell = worksheet.getCell("B1");
//   titleCell.value = "Customer Master Report";
//   titleCell.font = { bold: true, size: 14 };
//   titleCell.alignment = { horizontal: "center", vertical: "middle" };

//   // === Corp ID + Date Range ===
//   const currentDate = new Date().toISOString().slice(0, 10);
//   const startDate = req.query.start_date || currentDate;
//   const endDate = req.query.end_date || currentDate;
//   const corpId = companyId || (customers.length > 0 ? customers[0].company_id : "N/A");

//   worksheet.mergeCells("C2:E2");
//   worksheet.getCell("C2").value = Date Range: ${startDate} to ${endDate};
//   worksheet.getCell("C2").font = { bold: true, size: 11 };

//   worksheet.mergeCells("G2:K2");
//   worksheet.getCell("G2").value = Corporate ID: ${corpId};
//   worksheet.getCell("G2").font = { bold: true, size: 11 };
//   worksheet.getCell("G2").alignment = { horizontal: "right", vertical: "middle" };

//   worksheet.addRow([]);
//   const headerStartRow = 4;

//   // === Headers ===
//   const headers = [
//     "Sl. No",
//     "Create Date",
//     "Corp ID",
//     "Name",
//     "Account Number",
    
//     "IFSC Code",
//     "Account ID",
//     "Mobile",
//     "Email",
//     "Validity",
//     "Status",
//     "Remarks",
//   ];

//   worksheet.columns = [
//     { key: "blank", width: 3 },
//     { key: "s_no", width: 8 },
//     { key: "create_date", width: 20 }, // ✅ Fixed key name
//     { key: "company_id", width: 15 },
//     { key: "name", width: 22 },
//     { key: "account_number", width: 22 },
//     { key: "bank_name", width: 20 },
//     { key: "ifsc_code", width: 18 },
//     { key: "account_id", width: 18 },
//     { key: "mobile", width: 15 },
//     { key: "email", width: 25 },
//     { key: "validity", width: 12 },
//     { key: "status", width: 15 },
//     { key: "remark", width: 30 },
//   ];

//   // === Header Styling ===
//   headers.forEach((header, i) => {
//     const cell = worksheet.getCell(${String.fromCharCode(66 + i)}${headerStartRow});
//     cell.value = header;
//     cell.font = { bold: true, size: 11 };
//     cell.alignment = { horizontal: "center", vertical: "middle" };
//     cell.border = {
//       top: { style: "thin" },
//       bottom: { style: "thin" },
//       left: { style: "thin" },
//       right: { style: "thin" },
//     };
//     cell.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "DCE6F1" },
//     };
//   });

//   // === Data Rows ===
//   customers.forEach((c, index) => {
//     let createDate = "";
//     if (c.create_on) {
//       if (typeof c.create_on === "string") {
//         createDate = c.create_on;
//       } else {
//         const d = new Date(c.create_on);
//         createDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
//           d.getDate()
//         ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
//           d.getMinutes()
//         ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
//       }
//     }

//     const row = worksheet.addRow({
//       blank: "",
//       s_no: index + 1,
//       create_date: createDate || "", // ✅ Correct key used
//       company_id: c.company_id || "",
//       name: c.name || "",
//       account_number: c.account_number || "",
//       bank_name: c.bank_name || "",
//       ifsc_code: c.ifsc_code || "",
//       account_id: c.account_id || "",
//       mobile: c.mobile || "",
//       email: c.email || "",
//       validity: c.validity || "",
//       status: c.status || "",
//       remark: c.remark || "-",
//     });

//     row.alignment = { vertical: "middle", horizontal: "center" };
//     row.border = {
//       top: { style: "thin" },
//       bottom: { style: "thin" },
//       left: { style: "thin" },
//       right: { style: "thin" },
//     };
//   });

//   // === Freeze Header ===
//   worksheet.views = [{ state: "frozen", ySplit: headerStartRow }];

//   // === File Name ===
//   const fileName = ${corpId}_${startDate}-${endDate}_Customer_Master_Report.xlsx;
//   res.setHeader("Content-Disposition", attachment; filename=${fileName});
//   res.setHeader(
//     "Content-Type",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//   );

//   await workbook.xlsx.write(res);
//   return res.end();
// }




//     const [countResult] = await connection.execute(
//       SELECT COUNT(*) AS total ${baseSql},
//       baseParams
//     );
//     const totalRecords = countResult[0].total;
//     const totalPages = Math.ceil(totalRecords / limit);

  
//     const [rows] = await connection.execute(
//       SELECT * ${baseSql} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset},
//       baseParams
//     );

   
//     return res.status(200).json({
//       pagination: {
//         totalRecords,
//         totalPages,
//         currentPage: page,
//         limit,
//       },
//       count: rows.length,
//       data: rows.map((r) => ({
//         id: r.id,
//         company_id: r.company_id,
//         name: r.name,
//         account_id: r.account_id,
//         account_number: r.account_number,
//         ifsc_code: r.ifsc_code,
//         email: r.email,
//         mobile: r.mobile,
//         purpose: r.purpose,
//         validity: r.validity,
//         create_on: r.create_on,
//         update_on: r.update_on,
//         create_by: r.create_by,
//         update_by: r.update_by,
//         status: r.status,
//         remark: r.remark,
//       })),
//     });
//   } catch (err) {
//     console.error("customer master error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

