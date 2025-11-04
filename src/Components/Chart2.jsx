import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { colchartReport } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";

const Chart2 = ({ barselectedmonths }) => {
  const dispatch = useDispatch();

  // ✅ Proper useEffect usage — run when barselectedmonths changes
  useEffect(() => {
    if (barselectedmonths) {
      dispatch(colchartReport(barselectedmonths));
    }
  }, [dispatch, barselectedmonths]);

  // ✅ Get data from Redux
  const colchartData = useSelector((state) => state.colchartreport.colchartreport);
  console.log(19, colchartData);

  // ✅ Safely extract data from API response
  const dataArray = colchartData?.data || [];

  // ✅ Prepare chart data dynamically
  const months = dataArray.map((item) => item.month);
  const totalAmounts = dataArray.map((item) => Number(item.total_amount));
  const successAmounts = dataArray.map((item) => Number(item.success_amount));
  const failedAmounts = dataArray.map((item) => Number(item.failed_amount));
  const pendingAmounts = dataArray.map((item) => Number(item.pending_amount));

  // ✅ Chart series from API data
  const series = [
    {
      name: "Total Amount",
      data: totalAmounts,
    },
    {
      name: "Success Amount",
      data: successAmounts,
    },
    {
      name: "Failed Amount",
      data: failedAmounts,
    },
    {
      name: "pending Amount",
      data: pendingAmounts,
    },
  ];

  // ✅ Chart options
  const options = {
    chart: {
      type: "bar",
      height: 400,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: months.length > 0 ? months : ["No Data"],
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Amount (₹)",
      },
    },
    colors: ["#3b82f6", "#22c55e", "#ef4444","#f2c71b"], // blue, green, red
    tooltip: {
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#555",
      },
    },
  };

  return (
    <div className="w-full h-full">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default Chart2;
