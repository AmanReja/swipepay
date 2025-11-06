import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { colchartReport } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";

const Chart2 = ({ selected, theme }) => {
  const dispatch = useDispatch();
  const colchartData = useSelector(
    (state) => state.colchartreport.colchartreport
  );

  useEffect(() => {
    if (selected) {
      dispatch(colchartReport(selected));
    }
  }, [dispatch, selected]);

  console.log("📊 Collection Chart Data:", colchartData);

  // ✅ Handle undefined or empty data
  // if (!colchartData || Object.keys(colchartData).length === 0) {
  //   return <p className="text-center mt-10 text-gray-500">No data available</p>;
  // }

  // ✅ Extract & normalize data by type
  const { type } = colchartData;
  let categories = [];
  let amounts = [];

  switch (type) {
    case "today":
      categories = [colchartData.data?.day || "Today"];
      amounts = [parseFloat(colchartData.data?.success_amount || 0)];
      break;

    case "yesterday":
      categories = [colchartData.data?.day || "Yesterday"];
      amounts = [parseFloat(colchartData.data?.success_amount || 0)];
      break;

    case "week":
      categories = colchartData.days?.map((d) => d.day) || [];
      amounts =
        colchartData.days?.map((d) => parseFloat(d.success_amount || 0)) || [];
      break;

    case "12months":
      categories = colchartData.months?.map((m) => m.month) || [];
      amounts =
        colchartData.months?.map((m) => parseFloat(m.success_amount || 0)) ||
        [];
      break;

    default:
      categories = [];
      amounts = [];
  }

  // ✅ Series configuration
  const series = [
    {
      name: "Success Amount (₹)",
      data: amounts,
    },
  ];

  // ✅ Theme-based colors
  const textColor = theme === "dark" ? "#f1f1f1" : "#333";
  const gridColor = theme === "dark" ? "#444" : "#ddd";
  const backgroundColor = theme === "dark" ? "#1f2937" : "#fff";

  // ✅ Chart options
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
        borderRadius: 6,
        horizontal: false,
        columnWidth: "45%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      title: {
        text:
          type === "12months"
            ? "Months"
            : type === "week"
            ? "Days of Week"
            : type === "yesterday"
            ? "Yesterday"
            : "Today",
        style: { color: textColor },
      },
      labels: {
        style: { colors: Array(categories.length || 1).fill(textColor) },
      },
      axisBorder: { color: gridColor },
      axisTicks: { color: gridColor },
    },
    yaxis: {
      title: {
        text: "Amount (₹)",
        style: { color: textColor },
      },
      labels: {
        style: { colors: [textColor] },
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    grid: { borderColor: gridColor },
    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    legend: { show: false }, // Only one series, so no need for legend
    colors: ["#3b82f6"], // Blue for collection success
  };

  return (
    <div
      className={`w-full h-full ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default Chart2;
