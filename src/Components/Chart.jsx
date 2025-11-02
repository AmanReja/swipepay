import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = () => {
  const series = [
    {
      name: "series1",
      data: [10, 20, 30, 45, 32, 35, 50],
    },
    {
      name: "series2",
      data: [15, 25, 35, 40, 38, 52, 42],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "HH:mm",
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#444",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    colors: ["#80ffdb", "#00b4d8"],
  };

  return (
    <div className="w-full h-full">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={320}
      />
    </div>
  );
};

export default Chart;

// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import { useDispatch, useSelector } from "react-redux";
// import { summaryreport } from "../redux/action"; // adjust path as needed

// const Chart = () => {
//   const dispatch = useDispatch();
//   const { summaryData } = useSelector((state) => state.summarydata.summarydata);

//   const [series, setSeries] = useState([]);
//   const [categories, setCategories] = useState([]);

//   // Fetch summary report on mount
//   useEffect(() => {
//     dispatch(summaryreport("daily")); // or pass your filter type like "monthly"
//   }, [dispatch]);

//   // When data updates, format it for the chart
//   useEffect(() => {
//     if (summaryData) {
//       // Example: assume summaryData looks like:
//       // { dates: ["2025-11-01", "2025-11-02"], income: [20, 30], expense: [15, 25] }

//       setSeries([
//         { name: "Income", data: summaryData?.income || [] },
//         { name: "Expense", data: summaryData?.expense || [] },
//       ]);

//       setCategories(summaryData?.dates || []);
//     }
//   }, [summaryData]);

//   const options = {
//     chart: { type: "area", toolbar: { show: true } },
//     dataLabels: { enabled: false },
//     stroke: { curve: "smooth", width: 2 },
//     xaxis: { type: "datetime", categories },
//     tooltip: { x: { format: "dd MMM HH:mm" } },
//     legend: { position: "bottom" },
//     fill: {
//       type: "gradient",
//       gradient: {
//         shadeIntensity: 1,
//         opacityFrom: 0.8,
//         opacityTo: 0.3,
//         stops: [0, 90, 100],
//       },
//     },
//     colors: ["#80ffdb", "#00b4d8"],
//   };

//   return (
//     <div className="w-full h-full">
//       {series.length > 0 ? (
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="area"
//           height={320}
//         />
//       ) : (
//         <p className="text-center text-gray-500">Loading chart...</p>
//       )}
//     </div>
//   );
// };

// export default Chart;
