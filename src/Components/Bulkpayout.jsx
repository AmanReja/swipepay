import React, { useEffect, useContext, useState } from "react";
import Chart from "./Chart";
import Hdfc from "../assets/images/HDFC.png";
import { Outlet } from "react-router-dom";
import i1 from "../assets/icons/2.svg";
import i2 from "../assets/icons/4.svg";
import { useDispatch, useSelector } from "react-redux";
import { getall_bulkpay_data } from "../redux/action";
import { Theme } from "../Contexts/Theme";
import Contentloader from "./Contentloader";

const Bulkpayout = () => {
  const [load, setLoad] = useState(false);

  const { theme, setTheme } = useContext(Theme);
  const dispatch = useDispatch();
  const bulkpayoutdata = useSelector(
    (state) => state.bulkpayout.bulkpayout.data
  );
  console.log(bulkpayoutdata, 36);

  useEffect(() => {
    async function fetch() {
      setLoad(true);
      await dispatch(getall_bulkpay_data());
      setLoad(false);
    }
    fetch();
  }, [dispatch]);

  return (
    <div
      className={`w-[100%]  2xl:h-[85%] h-[80%] flex flex-col ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-white text-gray-800"
      }`}
    >
      <main className="w-full h-full flex-col overflow-y-scroll">
        <section className="w-full flex flex-col sm:flex-row gap-[20px] 2xl:h-[780px] sm:min-h-[600px] sm:h-[600px] px-[2px] sm:px-[20px]">
          <div
            className={`flex w-full sm:w-[32%] h-full p-5 rounded-xl ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <form className="flex flex-col border gap-6 w-full rounded-[10px] shadow-md border-gray-200 dark:border-gray-700">
              <h2
                className={`text-xl font-semibold h-[60px] text-center content-center mb-2 border-b-[1px] ${
                  theme === "dark"
                    ? "border-gray-700 text-gray-100"
                    : "border-gray-200 text-gray-800"
                }`}
              >
                Bulk Payout Transaction
              </h2>

              <div className="w-full px-[20px] flex-col flex gap-[10px]">
                <div
                  className={`flex p-4 flex-col text-[16px] text-center ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Effortless Bulk Payouts for Businesses
                </div>

                <div className="w-full px-[30px] py-[40px] flex justify-center">
                  <div
                    className={`flex p-4 flex-col border-dashed w-[400px] h-[200px] justify-center items-center border-[3px] ${
                      theme === "dark" ? "border-gray-600" : "border-gray-300"
                    }`}
                  >
                    <input type="file" id="Preview" className="hidden" />
                    <label
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-400"
                      }`}
                      htmlFor="Preview"
                    >
                      Drag And Drop Preview
                    </label>
                  </div>
                </div>

                <p
                  className={`w-full text-[12px] flex items-center gap-[5px] ${
                    theme === "dark" ? "text-blue-400" : "text-blue-500"
                  }`}
                >
                  <i className="fa-solid fa-cloud-arrow-down text-gray-600"></i>
                  <span className="border-b-blue-400 border-dashed border-b-[1px]">
                    Download CSV Template
                  </span>
                </p>

                <button
                  disabled
                  type="submit"
                  className="bg-blue-400 w-full text-white rounded px-4 py-2 hover:shadow-md hover:shadow-blue-400 transition text-left"
                >
                  Process
                </button>
              </div>
            </form>
          </div>

          <div
            className={`flex w-[68%] mt-[20px] h-full flex-col rounded-xl overflow-y-auto border-[1px] ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }`}
          >
            <div
              className={`flex justify-between items-center p-4 h-[60px] w-full ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              <h2 className="text-[16px] font-semibold">
                Last 10 Transactions
              </h2>
              <div
                className={`border-[1px] p-1 px-[20px] rounded-[8px] duration-300 ${
                  theme === "dark"
                    ? "border-gray-600 hover:shadow-gray-700"
                    : "border-gray-300 hover:shadow-gray-300"
                }`}
              >
                <button className="text-[12px] font-medium text-gray-500">
                  See More Transaction
                </button>
              </div>
            </div>

            <table
              className={`w-full text-sm text-left ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <thead
                className={`text-[11px] uppercase border-b border-t ${
                  theme === "dark"
                    ? "text-gray-400 border-gray-600 bg-gray-700"
                    : "text-gray-400 border-gray-300 bg-[#fcfcfc]"
                }`}
              >
                <tr>
                  <th className="px-4 py-4">#Status</th>
                  <th className="px-4 py-4">Txn Date</th>
                  <th className="px-4 py-4">UTR</th>
                  <th className="px-4 py-4">Account Details</th>
                  <th className="px-4 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="text-[12px] font-semibold">
                {load
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <Contentloader key={i} />
                    ))
                  : bulkpayoutdata?.map((txn, i) => (
                      <tr
                        key={i}
                        className={`border-b hover:bg-gray-50 ${
                          theme === "dark"
                            ? "border-gray-700 hover:bg-gray-700"
                            : "border-gray-100 hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-2">
                          <span
                            className={`text-white rounded-[3px] px-[13px] py-[2px] text-center min-w-[80px] font-bold text-[12px] ${
                              txn.txn_status?.toUpperCase() === "SUCCESS"
                                ? "bg-green-400"
                                : txn.txn_status?.toUpperCase() === "PENDING"
                                ? "bg-yellow-400 text-black"
                                : "bg-red-400"
                            }`}
                          >
                            {txn.txn_status?.toUpperCase()}
                          </span>
                        </td>

                        <td className="px-4 py-5">{txn.txn_date}</td>
                        <td className="px-4 py-5">{txn.utr}</td>
                        <td className="px-4 py-5">{txn.account}</td>
                        <td className="px-4 py-5">{txn.total_amount}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex justify-between gap-6 p-6 mt-[50px] rounded-xl">
          {[
            {
              title: "Questions ?",
              desc: "Visit our Help Center for detailed assistance on billing, payments, and subscriptions.",
              img: i1,
              linkText: "Go to Help Center",
            },
            {
              title: "Contact Support",
              desc: "Need assistance? Contact our support team for prompt, personalized help your queries & concerns.",
              img: i2,
              linkText: "Contact Support",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex w-full flex-col border-[1px] rounded-[10px] shadow ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-800 text-gray-300"
                  : "border-gray-100 bg-white text-gray-800"
              }`}
            >
              <div className="w-full flex p-6">
                <div className="flex w-[75%] flex-col p-6 gap-[5px] min-h-[180px]">
                  <h1 className="text-[22px]">{item.title}</h1>
                  <p
                    className={`text-[14px] ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
                <div className="flex w-[25%] p-4">
                  <img src={item.img} alt="" />
                </div>
              </div>
              <div
                className={`w-full flex border-t h-[40px] justify-center items-center ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <a
                  className="text-blue-500 border-b-[1px] border-dashed text-[12px]"
                  href=""
                >
                  {item.linkText}
                </a>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Bulkpayout;
