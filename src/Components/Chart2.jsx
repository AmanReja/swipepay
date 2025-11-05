import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { colchartReport } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";

const Chart2 = ({ barselectedmonths, theme }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (barselectedmonths) {
      dispatch(colchartReport(barselectedmonths));
    }
  }, [dispatch, barselectedmonths]);

  const colchartData = useSelector((state) => state.colchartreport.colchartreport);
  const dataArray = colchartData?.data || [];

  const months = dataArray.map((item) => item.month);
  const totalAmounts = dataArray.map((item) => Number(item.total_amount));
  const successAmounts = dataArray.map((item) => Number(item.success_amount));
  const failedAmounts = dataArray.map((item) => Number(item.failed_amount));
  const pendingAmounts = dataArray.map((item) => Number(item.pending_amount));

  const series = [
    { name: "Total Amount", data: totalAmounts },
    { name: "Success Amount", data: successAmounts },
    { name: "Failed Amount", data: failedAmounts },
    { name: "Pending Amount", data: pendingAmounts },
  ];


  const textColor = theme === "dark" ? "#f1f1f1" : "#333";
  const gridColor = theme === "dark" ? "#444" : "#ddd";
  const backgroundColor = theme === "dark" ? "#1f2937" : "#fff";

  const options = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: true },
      foreColor: textColor, 
      background: backgroundColor,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: months.length > 0 ? months : ["No Data"],
      title: {
        text: "Month",
        style: { color: textColor },
      },
      labels: {
        style: { colors: Array(months.length || 1).fill(textColor) },
      },
      axisBorder: { color: gridColor },
      axisTicks: { color: gridColor },
    },
    yaxis: {
      title: {
        text: "Amount (₹)",
        style: { color: textColor },
      },
      labels: { style: { colors: [textColor] } },
    },
    grid: { borderColor: gridColor },
    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
      y: { formatter: (val) => `₹${val.toLocaleString()}` },
    },
    legend: {
      position: "bottom",
      labels: { colors: textColor },
    },
    colors: ["#3b82f6", "#22c55e", "#ef4444", "#f2c71b"], 
  };

  return (
    <div className={`w-full h-full ${theme === "dark" ? "text-white" : "text-black"}`}>
      <ReactApexChart options={options} series={series} type="bar"    height={300}/>
    </div>
  );
};

export default Chart2;
