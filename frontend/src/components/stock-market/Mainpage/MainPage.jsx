import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import "chart.js/auto";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [differenceData, setUaDifferenceData] = useState([]);
  const [visibleCharts, setVisibleCharts] = useState({
    marketStatusChart: true,
    callOptionYieldChart: true,
    putOptionYieldChart: true,
    orderBookChart: true,
    equityReturnsDiffChart: true,
    ETFNAVChart: true,
    average: true,
    lastprice: true,
    openinterest: true,
    option: true,
    
  });
  const [showModal, setShowModal] = useState(false);
  const [etfData, setETFData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state



  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.optionscreener.ir/api/market_view/");
        const result = await response.json();
        setData(result.data); // Assuming the API response has a `data` field
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.optionscreener.ir/api/market_view/etf_nav");
        const result = await response.json();
        setETFData(result.data || []); // Ensure `data` exists in the response
      } catch (error) {
        console.error("Error fetching ETF data:", error);
      } finally {
      }
    };

    fetchData();
  }, []);




useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.optionscreener.ir/api/market_view/ua_difference");
      const result = await response.json();
      setUaDifferenceData(result.data); // Assuming the API response has a data field
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, []);





    // Fetch data from the first API
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://api.optionscreener.ir/api/market_view/");
          const result = await response.json();
          setData(result.data); // Assuming the API response has a `data` field
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
  
    // Fetch ETF data from the second API
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://api.optionscreener.ir/api/market_view/etf_nav");
          const result = await response.json();
          setETFData(result.data || []); // Ensure `data` exists in the response
        } catch (error) {
          console.error("Error fetching ETF data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    // Fetch Ua Difference data from the third API
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://api.optionscreener.ir/api/market_view/ua_difference");
          const result = await response.json();
          setUaDifferenceData(result.data); // Assuming the API response has a `data` field
        } catch (error) {
          console.error("Error fetching Ua Difference data:", error);
        } finally {
          setIsLoading(false); // Set loading to false after all fetches are done
        }
      };
      fetchData();
    }, []);
  
    // Loading state - show a loading indicator while data is being fetched
   // if (isLoading) {
    //  return (
   //     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    //    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
   //   </div>
   //   );
  //  }
//  
    // Check if any of the fetched data is missing
    if (!data || !etfData || !differenceData) {
      return (
        <div className="text-center mt-8 text-lg font-semibold text-red-500">
          خطا در بارگذاری داده‌ها
        </div>
      );
    }


// Extract all values for a specific field
const extractFieldData = (field) => {
  return data.map((item) => item[field]);
};
// Extract all values for a specific field
const extractDifferenceFieldData = (field) => {
  return differenceData.map((item) => item[field]);
};



const prepareCharts = (data) => {
  return {
    marketStatusChart: {
      data: {
        labels: data.map((item) => item.time || "Unknown"),
        datasets: [
          {
            label: "شاخص بازدهی - آخرین قیمت",
            data: extractFieldData("equity_returns_index_last_price_value"),
     backgroundColor: "rgba(44, 91, 168)",
            borderColor: "rgba(0, 73, 191)",
            borderWidth: 3, // Thicker line
          pointRadius: 1, // Smaller points
          pointHoverRadius: 4, // Slightly larger points on hover
          },
          {
            label: "شاخص بازدهی - قیمت پایانی",
            data: extractFieldData("equity_returns_index_final_price_value"),
              backgroundColor: "rgba(61, 61, 61)",
            borderColor: "rgba(0, 0, 0)",
            borderWidth: 3, // Thicker line
          pointRadius: 1, // Smaller points
          pointHoverRadius: 4, // Slightly larger points on hover
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "وضعیت بازار سهام",
            font: {
              size: 20, // سایز بزرگتر برای عنوان
                weight: "bold",
                family: "Vazir-Medium",
            },
            color: "black", // رنگ عنوان
            padding: 20, // Slight padding around the title
          },
          legend: {
            position: "bottom", // Legend at the bottom
            labels: {
              font: {
                size: 15  ,
                family: "Vazir-Medium", // Consistent font for clarity
              },
              padding: 16, // Space between legend items
            },
          },
          tooltip: {
            position: "nearest", // Tooltips near the point for better experience
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                const value = context.raw || 0;
                return `${label}: ${value}%`; // Show percentage value in tooltip
              },
            },
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker tooltip background
            titleFont: {
              size: 14,
              weight: "bold",
              family: "Vazir-Medium",
            },
            bodyFont: {
              size: 12,
              family: "Vazir-Medium",
            },
            padding: 10,
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 14,
                family: "Vazir-Medium", // Consistent font across axes
              },
              maxRotation: 45,
              minRotation: 30, // Adjust rotation for better space efficiency
            },
            grid: {
              color: "#ffffff", // White grid lines for cleaner design
            },
          },
          y: {
            ticks: {
              callback: (value) => {
                const dataset = extractFieldData("equity_returns_index_last_price_value");
                if (!dataset || dataset.length === 0) {
                  return "N/A"; // Handle missing data gracefully
                }
                const closestValue = dataset.reduce((prev, curr) =>
                  Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
                );
                return `${closestValue}%`; // Show percentage with the closest value
              },
              font: {
                size: 14,
                family: "Vazir-Medium", // Matching font for y-axis labels
              },
            },
            grid: {
              color: "#ffffff", // White grid lines for cleaner design
            },
          },
        
        },
      },
    
    
    },
    callOptionYieldChart: {
      data: {
        labels: data.map((item) => item.time || "Unknown"),
        datasets: [
          {
            label: "اختیار خرید - آخرین قیمت",
            data: extractFieldData("call_index_last_price_value"),
            backgroundColor: "rgba(52, 194, 52, 0.3)",
            borderColor: "rgba(0, 201, 0)",
            borderWidth: 3, // Thicker line
          pointRadius: 1, // Smaller points
          pointHoverRadius: 4, // Slightly larger points on hover
          },
          {
            label: "اختیار فروش - آخرین قیمت",
            data: extractFieldData("put_index_last_price_value"),
            backgroundColor: "rgba(219, 46, 46, 0.3)",
            borderColor: "rgba(201, 0, 0)",
            borderWidth: 3, // Thicker line
          pointRadius: 1, // Smaller points
          pointHoverRadius: 4, // Slightly larger points on hover
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "وضعیت بازدهی آخرین معامله اختیار خرید",
            font: {
              size: 20, // سایز بزرگتر برای عنوان
              weight: "bold",
              family: "Vazir-Medium",
            },
            color: "black", // رنگ عنوان
            padding: 20, // Slight padding around the title
          },
          legend: {
            position: "bottom", // Legend at the bottom
            labels: {
              font: {
                size: 15  , // Slightly smaller font size for the legend
                family: "Vazir-Medium", // Consistent font for clarity
              },
              padding: 16, // Space between legend items
            },
          },
          tooltip: {
            position: "nearest", // Tooltips near the point for better user experience
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                const value = context.raw || 0;
                return `${label}: ${value}%`; // Show percentage value in tooltip
              },
            },
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker tooltip background for better visibility
            titleFont: {
              size: 14,
              weight: "bold",
              family: "Vazir-Medium",
            },
            bodyFont: {
              size: 12,
              family: "Vazir-Medium",
            },
            padding: 10,
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 14, // Consistent font size for x-axis labels
                family: "Vazir-Medium", // Matching font for x-axis labels
              },
              maxRotation: 45,
              minRotation: 30, // Adjust rotation for better space efficiency
            },
            grid: {
              color: "#ffffff", // White grid lines for cleaner design
            },
          },
          y: {
            ticks: {
              callback: (value) => {
                // Ensure the negative sign is placed before the number
                if (value < 0) {
                  return `${Math.abs(value)}%-`; // Display negative values with the '-' before
                }
                return `${value}%`; // Display positive values with '%'
              },
              font: {
                size: 14, // Consistent font size for y-axis labels
                family: "Vazir-Medium", // Matching font for y-axis labels
              },
            },
            grid: {
              color: "#ffffff", // White grid lines for a cleaner design
            },
          },
        
        },
      },
    },
   
     
      option: {
        data: {
          labels: data.map((item) => item.time || "Unknown"),
          datasets: [
            {
              label: "ارزش  معاملات اختیار خرید",
              data: extractFieldData("call_volume"),
              backgroundColor: "rgba(52, 194, 52, 0.3)",
              borderColor: "rgba(0, 201, 0)",
              borderWidth: 3, // Thicker line
            pointRadius: 1, // Smaller points
            pointHoverRadius: 4, // Slightly larger points on hover
            },
            {
              label: " ارزش معاملات اختیار فروش",
              data: extractFieldData("put_volume"),
              backgroundColor: "rgba(219, 46, 46, 0.3)",
              borderColor: "rgba(201, 0, 0)",
              borderWidth: 3, // Thicker line
            pointRadius: 1, // Smaller points
            pointHoverRadius: 4, // Slightly larger points on hover
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "ارزش معاملات",
              font: {
                size: 20, // سایز بزرگتر برای عنوان
                weight: "bold",
                family: "Vazir-Medium",
              },
              color: "black", // رنگ عنوان
              padding: 20, // Slight padding around the title
            },
            legend: {
              position: "bottom", // Legend at the bottom
              labels: {
                font: {
                  size: 15  , // Slightly smaller font size for the legend
                  family: "Vazir-Medium", // Consistent font for clarity
                },
                padding: 16, // Space between legend items
              },
            },
            tooltip: {
              position: "nearest", // Tooltips near the point for better user experience
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || 0;
                  return `${label}: ${(value / 1000000000).toFixed(2)}B`; // Show value in billions
                },
              },
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker tooltip background for better visibility
              titleFont: {
                size: 14,
                weight: "bold",
                family: "Vazir-Medium",
              },
              bodyFont: {
                size: 12,
                family: "Vazir-Medium",
              },
              padding: 10,
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 14, // Consistent font size for x-axis labels
                  family: "Vazir-Medium", // Matching font for x-axis labels
                },
                maxRotation: 45,
                minRotation: 30, // Adjust rotation for better space efficiency
              },
              grid: {
                color: "#ffffff", // White grid lines for cleaner design
              },
            },
            y: {
              ticks: {
                callback: (value) => {
                  // Ensure the negative sign is placed before the number
                  if (value < 0) {
                    return `${Math.abs(value / 1000000000)} میلیارد ` ; // Negative value in billions with '-' prefix
                  }
                  return `${(value / 1000000000).toFixed(2)} میلیارد`; // Show value in billions
                },
                font: {
                  size: 14, // Consistent font size for y-axis labels
                  family: "Vazir-Medium", // Matching font for y-axis labels
                },
              },
              grid: {
                color: "#ffffff", // White grid lines for cleaner design
              },
            },
          },
        },
      },
     
      orderBookChart: {
        data: {
          labels: data.map((item) => item.time || "Unknown"),
          datasets: [
            {
              label: "ارزش سفارشات خرید",
              data: extractFieldData("order_book_offer_value"),
              backgroundColor: "rgba(52, 194, 52, 0.3)",
              borderColor: "rgba(0, 201, 0)",
              borderWidth: 3, // Thicker line
              pointRadius: 1, // Smaller points
              pointHoverRadius: 4, // Slightly larger points on hover
            },
            {
             
              label: "ارزش سفارشات فروش",
              data: extractFieldData("order_book_demand_value"),
              backgroundColor: "rgba(219, 46, 46, 0.3)",
              borderColor: "rgba(201, 0, 0)",
              borderWidth: 3, // Thicker line
              pointRadius: 1, // Smaller points
              pointHoverRadius: 4, // Slightly larger points on hover
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "ارزش سفارشات سمت خرید و فروش",
              font: {
                size: 20, // سایز بزرگتر برای عنوان
                weight: "bold",
                family: "Vazir-Medium",
              },
              color: "black", // رنگ عنوان
              padding: 20, // Slight padding around the title
            },
            legend: {
              position: "bottom", // Legend at the bottom
              labels: {
                font: {
                  size: 15  , // Slightly smaller font size for the legend
                  family: "Vazir-Medium", // Consistent font for clarity
                },
                padding: 16, // Space between legend items
              },
            },
            tooltip: {
              position: "nearest", // Tooltips near the point for better user experience
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || 0;
                  return `${label}: ${(value / 1000000000).toFixed(2)}B`; // Show value in billions
                },
              },
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker tooltip background for better visibility
              titleFont: {
                size: 14,
                weight: "bold",
                family: "Vazir-Medium",
              },
              bodyFont: {
                size: 12,
                family: "Vazir-Medium",
              },
              padding: 10,
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 14, // Consistent font size for x-axis labels
                  family: "Vazir-Medium", // Matching font for x-axis labels
                },
                maxRotation: 45,
                minRotation: 30, // Adjust rotation for better space efficiency
              },
              grid: {
                color: "#ffffff", // White grid lines for cleaner design
              },
            },
            y: {
              ticks: {
                callback: (value) => {
                  // Show values in billions, with '-' for negative values
                  if (value < 0) {
                    return `${Math.abs(value / 1000000000).toFixed(2)} میلیارد`; // Negative value in billions
                  }
                  return `${(value / 1000000000).toFixed(2)} میلیارد`; // Positive value in billions
                },
                font: {
                  size: 14, // Consistent font size for y-axis labels
                  family: "Vazir-Medium", // Matching font for y-axis labels
                },
              },
              grid: {
                color: "#ffffff", // White grid lines for cleaner design
              },
            
            },
          },
        },
      },
      equityReturnsDiffChart: {
        data: {
          labels: data.map((item) => item.time || "Unknown"),
          datasets: [
            {
              label: "اختلاف مثبت",
              data: extractFieldData("equity_returns_n_last_higher_than_final"),
              backgroundColor: "rgba(52, 194, 52, 0.3)", // Lighter background for better clarity
              borderColor: "rgba(0, 201, 0)", // Strong green border color
              borderWidth: 3, // Thicker line for better visibility
              pointRadius: 1, // Slightly larger points for clarity
              pointHoverRadius: 5, // Larger hover points for better interaction
            },
            {
              label: "اختلاف صفر",
              data: extractFieldData("equity_returns_n_last_equal_to_final"),
              backgroundColor: "rgba(168, 168, 168, 0.3)", // Lighter gray for neutral
              borderColor: "rgba(150, 150, 150)", // Gray border
              borderWidth: 3, // Thicker line
              pointRadius: 1, // Slightly larger points for clarity
              pointHoverRadius: 5, // Larger hover points for better interaction
            },
            {
              label: "اختلاف منفی",
              data: extractFieldData("equity_returns_n_last_lower_than_final"),
              backgroundColor: "rgba(201, 0, 0, 0.3)", // Lighter red for negative
              borderColor: "rgba(219, 46, 46)", // Strong red border
              borderWidth: 3, // Thicker line
              pointRadius: 1, // Slightly larger points for clarity
              pointHoverRadius: 5, // Larger hover points for better interaction
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "تعداد نمادهای با اختلاف آخرین معامله و پایانی مثبت، منفی و صفر",
              font: {
                size: 20, // سایز بزرگتر برای عنوان
                weight: "bold",
                family: "Vazir-Medium",
              },
              color: "black", // رنگ عنوان
              padding: 20, // Slight padding around the title
            },
            legend: {
              position: "bottom", // Legend at the bottom
              labels: {
                font: {
                  size: 15  , // Slightly smaller font size for the legend
                  family: "Vazir-Medium", // Consistent font for clarity
                },
                padding: 16, // Space between legend items
              },
            },
            tooltip: {
              position: "nearest", // Tooltips near the point for better user experience
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || 0;
                  return `${label}: ${value}`; // Display value without transformation
                },
              },
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker tooltip background for better visibility
              titleFont: {
                size: 14,
                weight: "bold",
                family: "Vazir-Medium",
              },
              bodyFont: {
                size: 12,
                family: "Vazir-Medium",
              },
              padding: 10,
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 14, // Consistent font size for x-axis labels
                  family: "Vazir-Medium", // Matching font for x-axis labels
                },
                maxRotation: 45,
                minRotation: 30, // Adjust rotation for better space efficiency
              },
              grid: {
                color: "#ffffff", // White grid lines for cleaner design
              },
            },
            y: {
              ticks: {
                font: {
                  size: 14, // Consistent font size for y-axis labels
                  family: "Vazir-Medium", // Matching font for y-axis labels
                },
              },
              grid: {
                color: "#ffffff", // White grid lines for cleaner design
              },
            },
          },
        },
      },


      ETFNAVChart : {
       data: {
    labels: etfData.map((item) => item.symbol_fa), // ETF symbols
    datasets: [
      {
        label: "درصد حباب",
        data: etfData.map((item) => item.last_price_nav_diff), // Bubble percentage
        backgroundColor: etfData.map((item) =>
          item.last_price_nav_diff >= 0 ? "rgba(52, 194, 52, 0.8)" : "rgba(219, 46, 46, 0.8)"
        ), // Green for positive, red for negative
        borderColor: etfData.map((item) =>
          item.last_price_nav_diff >= 0 ? "rgba(0, 201, 0, 1)" : "rgba(201, 0, 0, 1)"
        ), // Border colors
        borderWidth: 2, // Thicker border for better visibility
        type: "bar", // Explicitly setting type to bar
        pointRadius: 3, // Points for better interaction (if applicable)
        pointHoverRadius: 5, // Larger points on hover
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "درصد حباب NAV صندوق‌های ETF",
        font: {
          size: 20, // سایز بزرگتر برای عنوان
          weight: "bold",
          family: "Vazir-Medium",
        },
        color: "black", // رنگ عنوان
        padding: 20, // Padding for the title
      },
      legend: {
        display: false, // Disable legend as there is only one dataset
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`, // Add % sign to tooltip
        },
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker background for tooltips
        titleFont: {
          size: 14,
          weight: "bold",
          family: "Vazir-Medium",
        },
        bodyFont: {
          size: 15  ,
          family: "Vazir-Medium",
        },
        padding: 10, // Padding for the tooltip
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 15, // سایز فونت بزرگتر برای لژیند
            family: "Vazir-Medium", // هماهنگی فونت لژیند
          },
          maxRotation: 45,
          minRotation: 30, // Adjust rotation for better space efficiency
        },
        grid: {
          color: "#ffffff", // White grid lines for cleaner design
        },
      },
      y: {
        ticks: {
          callback: (value) => {
            // Ensure the negative sign is placed before the number
            if (value < 0) {
              return `${Math.abs(value)}%-`; // Negative value with the '-' before the value
            }
            return `${value}%`; // Positive value with '%'
          },
          font: {
            size: 14, // Consistent font size for y-axis labels
            family: "Vazir-Medium", // Matching font for y-axis labels
          },
        },
        title: {
          display: true,
          text: "درصد حباب NAV",
          font: {
            size: 16, // Slightly larger font for y-axis title
            family: "Vazir-Medium",
          },
        },
        grid: {
          color: "#ffffff", // White grid lines for cleaner design
        },
      
      },
          },
        },
      },



      average: {
        data: {
    labels: differenceData.map((item) => item.ua_difference_group), // استفاده از ua_difference_group به عنوان محور X
    datasets: [
      {
        label: "میانگین نوسان پذیری ضمنی اختیار خرید",
        data: extractDifferenceFieldData("average_iv_last_call"),
        fill: false, // پر نشدن ناحیه زیر خط
        backgroundColor: "rgba(44, 91, 168, 0.8)", // رنگ پس زمینه در صورتی که پر شود
        borderColor: "rgba(0, 73, 191, 1)", // رنگ خط
        borderWidth: 3,
        pointRadius: 4, // شعاع نقاط
        pointHoverRadius: 6, // شعاع نقاط در زمان هاور
        tension: 0.4, // کشیدگی منحنی (می‌توان از 0.1 تا 0.9 تنظیم کرد)
      },
      {
        label: "میانگین نوسان پذیری ضمنی اختیار فروش",
        data: extractDifferenceFieldData("average_iv_last_put"),
        fill: false, // پر نشدن ناحیه زیر خط
        backgroundColor: "rgba(255, 99, 132, 0.8)", // رنگ پس زمینه در صورتی که پر شود
        borderColor: "rgba(255, 99, 132, 1)", // رنگ خط
        borderWidth: 3,
        pointRadius: 4, // شعاع نقاط
        pointHoverRadius: 6, // شعاع نقاط در زمان هاور
        tension: 0.4, // کشیدگی منحنی
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "نوسان پذیری ضمنی اختیار خرید و فروش",
        font: {
          size: 20, // افزایش سایز عنوان
          weight: "bold",
          family: "Vazir-Medium", // فونت مورد استفاده
        },
        color: "black", // رنگ عنوان
        padding: 20, // padding برای عنوان
      },
      legend: {
        position: "bottom", // Legend at the bottom

        labels: {
          font: {
            size: 15, // سایز فونت بزرگتر برای لژیند
            family: "Vazir-Medium", // هماهنگی فونت لژیند
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`, // اضافه کردن علامت درصد در تولتیپ
        },
        backgroundColor: "rgba(0, 0, 0, 0.6)", // رنگ پس زمینه تولتیپ
        titleFont: {
          size: 14,
          weight: "bold",
          family: "Vazir-Medium",
        },
        bodyFont: {
          size: 15  ,
          family: "Vazir-Medium",
        },
        padding: 10, // padding برای تولتیپ
      },
    },
    scales: {
      x: {
        type: "category", // محور X نوع دسته‌ای باشد
        ticks: {
          font: {
            size: 14, // افزایش سایز فونت محور X
            family: "Vazir-Medium", // هماهنگی فونت محور X
          },
          maxRotation: 45, // چرخش حداکثر 45 درجه برای نمایش بهتر
          minRotation: 30, // چرخش حداقل 30 درجه برای استفاده بهینه از فضای محور
        },
        grid: {
          color: "#ffffff", // رنگ خطوط شبکه سفید
        },
      },
      y: {
        ticks: {
          callback: (value) => `${value}%`, // نمایش درصد در محور Y
          font: {
            size: 14, // سایز فونت بزرگتر برای محور Y
            family: "Vazir-Medium", // هماهنگی فونت محور Y
          },
        },
        title: {
          display: true,
          text: "درصد نوسان پذیری ضمنی",
          font: {
            size: 16, // سایز فونت عنوان محور Y بزرگتر
            family: "Vazir-Medium",
          },
        },
        grid: {
          color: "#ffffff", // خطوط شبکه سفید
        },
      },
          },
        },
      },
      
  
      // نمودار بازدهی آخرین معامله خرید و فروش
      lastprice: {
        data: {
          labels: differenceData.map((item) => item.ua_difference_group),
          datasets: [
            {
              label: "بازدهی آخرین معامله خرید",
              data: extractDifferenceFieldData("last_price_return_call"),
              backgroundColor: "rgba(44, 91, 168, 0.8)", // کمی شفافیت بیشتر
              borderColor: "rgba(0, 73, 191, 1)",
              borderWidth: 3,
              pointRadius: 4, // افزایش شعاع نقاط
              pointHoverRadius: 6, // شعاع بزرگتر برای هاور
              type: 'bar', // Explicitly setting type to bar
            },
            {
              label: "بازدهی آخرین معامله فروش",
              data: extractDifferenceFieldData("last_price_return_put"),
              backgroundColor: "rgba(255, 99, 132, 0.8)", // کمی شفافیت بیشتر
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 3,
              pointRadius: 4, // افزایش شعاع نقاط
              pointHoverRadius: 6, // شعاع بزرگتر برای هاور
              type: 'bar', // Explicitly setting type to bar
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "بازدهی آخرین معامله خرید و فروش",
              font: {
                size: 20, // سایز بزرگتر برای عنوان
                weight: "bold",
                family: "Vazir-Medium",
              },
              color: "black",
              padding: 20, // افزایش padding برای عنوان
            },
            
            legend: {
              position: "bottom", // Legend at the bottom
              labels: {
                font: {
                  size: 15,
                  family: "Vazir-Medium",
                },
              },
            },
            tooltip: {
              
              callbacks: {
                label: (context) => `${context.raw}%`, // اضافه کردن علامت درصد
              },
              backgroundColor: "rgba(0, 0, 0, 0.6)", // رنگ پس زمینه تولتیپ
              titleFont: {
                size: 14,
                weight: "bold",
                family: "Vazir-Medium",
              },
              bodyFont: {
                size: 15  ,
                family: "Vazir-Medium",
              },
              padding: 10, // افزایش padding برای تولتیپ
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 14, // سایز فونت بزرگتر برای محور X
                  family: "Vazir-Medium",
                },
                maxRotation: 45, // چرخش 45 درجه برای محور X
                minRotation: 30,
              },
              grid: {
                color: "#ffffff", // رنگ سفید برای خطوط شبکه
              },
            },
            y: {
              ticks: {
                callback: (value) => `${value}%`, // نمایش درصد در محور Y
                font: {
                  size: 14, // سایز فونت بزرگتر برای محور Y
                  family: "Vazir-Medium",
                },
              },
              title: {
                display: true,
                text: "بازدهی (%)",
                font: {
                  size: 16,
                  family: "Vazir-Medium",
                },
              },
              grid: {
                color: "#ffffff", // رنگ سفید برای خطوط شبکه
              },
            },
          
          },
        },
      },
  
      // نمودار تعداد موقعیت‌های باز اختیار خرید و فروش
      openinterest: {
        data: {
          labels: differenceData.map((item) => item.ua_difference_group),
          datasets: [
            {
              label: "تعداد موقعیت‌های باز اختیار خرید",
              data: extractDifferenceFieldData("open_interest_call"),
              backgroundColor: "rgba(44, 91, 168, 0.8)", // کمی شفافیت بیشتر
              borderColor: "rgba(0, 73, 191, 1)",
              borderWidth: 3,
              pointRadius: 4, // افزایش شعاع نقاط
              pointHoverRadius: 6, // شعاع بزرگتر برای هاور
              type: 'bar', // Explicitly setting type to bar
            },
            {
              label: "تعداد موقعیت‌های باز اختیار فروش",
              data: extractDifferenceFieldData("open_interest_put"),
              backgroundColor: "rgba(255, 99, 132, 0.8)", // کمی شفافیت بیشتر
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 3,
              pointRadius: 4, // افزایش شعاع نقاط
              pointHoverRadius: 6, // شعاع بزرگتر برای هاور
              type: 'bar', // Explicitly setting type to bar
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "تعداد موقعیت‌های باز اختیار خرید و فروش",
              font: {
                size: 20, // سایز بزرگتر برای عنوان
                weight: "bold",
                family: "Vazir-Medium",
              },
              color: "black",
              padding: 20, // افزایش padding برای عنوان
            },
            
            legend: {
              position: "bottom", // Legend at the bottom

              labels: {
                font: {
                  size: 15,
                  family: "Vazir-Medium",
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.raw}`, // نمایش مقدار بدون درصد
              },
              backgroundColor: "rgba(0, 0, 0, 0.6)", // رنگ پس زمینه تولتیپ
              titleFont: {
                size: 14,
                weight: "bold",
                family: "Vazir-Medium",
              },
              bodyFont: {
                size: 15  ,
                family: "Vazir-Medium",
              },
              padding: 10, // افزایش padding برای تولتیپ
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 14, // سایز فونت بزرگتر برای محور X
                  family: "Vazir-Medium",
                },
                maxRotation: 45, // چرخش 45 درجه برای محور X
                minRotation: 30,
              },
              grid: {
                color: "#ffffff", // رنگ سفید برای خطوط شبکه
              },
            },
            y: {
              ticks: {
                callback: (value) => `${value}`, // نمایش تعداد بدون درصد
                font: {
                  size: 14, // سایز فونت بزرگتر برای محور Y
                  family: "Vazir-Medium",
                },
              },
              title: {
                display: true,
                text: "تعداد موقعیت‌های باز",
                font: {
                  size: 16,
                  family: "Vazir-Medium",
                },
              },
              grid: {
                color: "#ffffff", // رنگ سفید برای خطوط شبکه
              },
            
            },
          },
        },
      },
    
    };
  };

  const charts = prepareCharts(data);



    // تابع برای تغییر وضعیت چک‌باکس‌ها
    const handleCheckboxChange = (chartKey) => {
      setVisibleCharts((prevState) => ({
        ...prevState,
        [chartKey]: !prevState[chartKey], // تغییر وضعیت نمایش نمودار
      }));
    };



    
  return (
    <>
    <div className="bg-[#dfe2eeed] min-h-screen p-6" dir="rtl">
      {/* دکمه مدال */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded-lg shadow-md mb-3 hover:bg-[color:var(--color-bg-variant)] transition-all"
      >
        ویرایش نمودارها
      </button>

   {/* مدال انتخاب نمودار */}
{/* مدال انتخاب نمودار */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all">
    <div className="bg-white p-8 rounded-xl shadow-lg w-[95%] max-w-md transform transition-transform duration-300 ease-out scale-95 hover:scale-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 tracking-wide">انتخاب نمودار</h3>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500 hover:text-gray-700 text-3xl transition-transform duration-200 transform hover:scale-110"
        >
          &times;
        </button>
      </div>

      <div className="space-y-6">
        {Object.keys(visibleCharts).map((chartKey) => {
          const persianNames = {
            marketStatusChart: 'نمودار وضعیت بازار',
            callOptionYieldChart: 'نمودار بازدهی گزینه خرید',
            putOptionYieldChart: 'نمودار بازدهی گزینه فروش',
            orderBookChart: 'نمودار دفتر سفارشات',
            equityReturnsDiffChart: 'تفاوت بازدهی سهام',
            ETFNAVChart: 'درصد حباب NAV صندوق‌های ETF',
            average: 'نوسان پذیری ضمنی',
            lastprice: 'موقعیت‌های باز',
            openinterest: 'بازدهی call و put',
            option: 'ارزش معاملات',
          };

          return (
            <label key={chartKey} className="flex items-center gap-3 text-gray-800 text-lg cursor-pointer transition-colors duration-200 hover:text-[color:var(--color-primary)]">
              <input
                type="checkbox"
                checked={visibleCharts[chartKey]}
                onChange={() => handleCheckboxChange(chartKey)}
                className="form-checkbox text-[color:var(--color-primary)] transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
              />
              <span>{persianNames[chartKey]}</span>
            </label>
          );
        })}
      </div>
    </div>
  </div>
)}


        {/* Chart Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Reusable Chart Component */}
          {['marketStatusChart', 'equityReturnsDiffChart', 'openinterest', 'callOptionYieldChart', 'orderBookChart', 'average', 'option', 'ETFNAVChart', 'lastprice'].map((chartKey) => 
            visibleCharts[chartKey] && (
              <ChartCard 
                key={chartKey}
                chartKey={chartKey}
                chartData={charts[chartKey]}
                handleCheckboxChange={handleCheckboxChange}  // ارسال تابع به عنوان prop

              />
            )
          )}
        </div>
      </div>
    </>
  );
};




// UI Component Updates
const ChartCard = ({ chartKey, chartData, handleCheckboxChange }) => {
  return (
    <div className=" bg-[#f4f7f9] shadow-sm rounded-xl p-6 hover:shadow-md transition duration-300 relative">
      {/* دکمه ضربدر برای حذف نمودار */}
      <button
        onClick={() => handleCheckboxChange(chartKey)}  // حالا اینجا تابع کار می‌کند
        className="absolute top-4 left-4 text-[color:var(--color-primary)]  text-sm px-3 py-1 rounded-full transition transform hover:scale-105"
        title="حذف نمودار"
      >
        ✖
      </button>
      
      {/* دکمه اضافی */}
      <button className="absolute top-4 right-4 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-bg-variant)] text-white text-sm px-3 py-1 rounded-full shadow-md transition transform hover:scale-105">
        !
      </button>

      {/* رسم نمودار */}
      <div className="mt-6">
        {chartData.options.type === 'bar' ? (
          <Bar data={chartData.data} options={chartData.options} />
        ) : (
          <Line data={chartData.data} options={chartData.options} />
        )}
      </div>
    </div>
  );
};

export default MainPage;