import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { chartReport } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";

const Chart = ({ selected, theme }) => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chartreport.chartreport);

  useEffect(() => {
    if (selected) {
      dispatch(chartReport(selected));
    }
  }, [dispatch, selected]);

  // ✅ Handle undefined or empty data
  // if (!chartData || Object.keys(chartData).length === 0) {
  //   return <p className="text-center mt-10 text-gray-500">No data available</p>;
  // }

  // ✅ Extract & normalize data by type
  const { type } = chartData;
  let categories = [];
  let successAmounts = [];

  switch (type) {
    case "today":
      categories = [chartData.data?.day || "Today"];
      successAmounts = [parseFloat(chartData.data?.success_amount || 0)];
      break;

    case "yesterday":
      categories = [chartData.data?.day || "Yesterday"];
      successAmounts = [parseFloat(chartData.data?.success_amount || 0)];
      break;

    case "week":
      categories = chartData.days?.map((d) => d.day) || [];
      successAmounts = chartData.days?.map((d) => parseFloat(d.success_amount || 0)) || [];
      break;

    case "12months":
      categories = chartData.months?.map((m) => m.month) || [];
      successAmounts = chartData.months?.map((m) => parseFloat(m.success_amount || 0)) || [];
      break;

    default:
      categories = [];
      successAmounts = [];
  }

  // ✅ Single series — Success Amount
  const series = [
    {
      name: "Success Amount (₹)",
      data: successAmounts,
    },
  ];

  // ✅ Theme-based styling
  const textColor = theme === "dark" ? "#f1f1f1" : "#333";
  const gridColor = theme === "dark" ? "#444" : "#ddd";

  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: { show: true },
      foreColor: textColor,
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
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
      title: { text: "Amount (₹)", style: { color: textColor } },
      labels: {
        style: { colors: [textColor] },
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    legend: { show: false },
    grid: { borderColor: gridColor },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    colors: ["#22c55e"],
  };

  return (
    <div
      className={`w-full h-full ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <ReactApexChart options={options} series={series} type="area" height={320} />
    </div>
  );
};

export default Chart;
