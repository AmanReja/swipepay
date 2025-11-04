import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { chartReport } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";

const Chart = ({selectedmonths}) => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chartreport.chartreport);
  console.log(9,chartData);

  useEffect(() => {
    if (selectedmonths) {
      dispatch(chartReport(selectedmonths));
    }
  }, [dispatch, selectedmonths]);
  
  

  // Ensure data is available and fallback to empty array
  const dataArray = chartData?.data || [];

  // Extract months and different amounts from API response
  const months = dataArray.map((item) => item.month);
  const totalAmounts = dataArray.map((item) => item.total_amount);
  const successAmounts = dataArray.map((item) => item.success_amount);
  const failedAmounts = dataArray.map((item) => item.failed_amount);
  const pendingAmounts = dataArray.map((item) => item.pending_amount);

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
      categories: months, // Use months from API
      title: {
        text: "Months",
      },
    },
    yaxis: {
      title: {
        text: "Amount (₹)",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `₹${val}`,
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
    colors: ["#007bff", "#28a745", "#dc3545","#eb8634"], // blue, green, red
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
