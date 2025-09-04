import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart2 = () => {
  const series = [
    {
      name: "Sales",
      data: [120, 200, 150, 80, 170, 250, 300, 280, 220, 190, 160, 210], // example sales
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 600,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        columnWidth: "60%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "Sales ($)",
      },
    },
    colors: ["#3b82f6"], // Tailwind blue-500
    title: {
      text: "Monthly Sales Report",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
  };

  return (
    <div className=" w-full h-full ">
      <ReactApexChart options={options} series={series} type="bar" height={350}  />
    </div>
  );
};

export default Chart2;
