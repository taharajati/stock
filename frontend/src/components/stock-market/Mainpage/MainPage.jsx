import React, { useEffect, useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StockMarketEChart from '../charts/StockMarketEChart';

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
  // Ripple state for modal and edit button
  const [rippleStyle, setRippleStyle] = useState(null);
  const [modalRippleStyle, setModalRippleStyle] = useState(null);
  const modalRef = useRef(null);

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
   // }
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
              color: "#ffffff", // White grid lines for cleaner design
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

  // Ripple handler for edit button
  const handleRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    setRippleStyle({ top: y, left: x, width: size, height: size });
    setTimeout(() => setRippleStyle(null), 600);
  };
  // Ripple handler for modal close button
  const handleModalRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    setModalRippleStyle({ top: y, left: x, width: size, height: size });
    setTimeout(() => setModalRippleStyle(null), 600);
  };

  // دسته‌بندی نمودارها
  const chartCategories = [
    {
      title: 'بازار سهام',
      keys: ['marketStatusChart', 'equityReturnsDiffChart'],
    },
    {
      title: 'بازار اختیار معامله',
      keys: ['callOptionYieldChart', 'putOptionYieldChart', 'option', 'openinterest', 'average', 'orderBookChart'],
    },
    {
      title: 'صندوق‌های ETF',
      keys: ['ETFNAVChart', 'lastprice'],
    },
  ];

  // --- Demo charts for آزمایشی ---
  const demoCharts = [
    {
      key: 'demoLine',
      title: 'چارت خطی آزمایشی',
      type: 'line',
      categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
      data: [120, 132, 101, 134, 90, 230],
    },
    {
      key: 'demoBar',
      title: 'چارت میله‌ای آزمایشی',
      type: 'bar',
      categories: ['A', 'B', 'C', 'D', 'E'],
      data: [23, 45, 12, 67, 34],
    },
    {
      key: 'demoPie',
      title: 'چارت دایره‌ای آزمایشی',
      type: 'pie',
      categories: [],
      data: [
        { value: 40, name: 'سهام' },
        { value: 30, name: 'اوراق' },
        { value: 20, name: 'کالا' },
        { value: 10, name: 'سایر' },
      ],
    },
  ];
    
  return (
    <div className="min-h-screen bg-white pt-16 pb-12 flex flex-col">
      {/* Main content container */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-2 sm:px-6 lg:px-8">
        {/* دکمه ویرایش نمودارها */}
        <div className="flex justify-end mb-8">
      <button
            onClick={e => { handleRipple(e); setShowModal(true); }}
            className="bg-gold text-navy font-bold px-6 py-2 rounded-full shadow border border-gold/40 hover:bg-gold-dark hover:text-white transition-all text-lg relative overflow-hidden"
      >
            {rippleStyle && (
              <span
                className="ripple"
                style={{
                  top: rippleStyle.top,
                  left: rippleStyle.left,
                  width: rippleStyle.width,
                  height: rippleStyle.height,
                }}
              />
            )}
        ویرایش نمودارها
      </button>
        </div>
{/* مدال انتخاب نمودار */}
{showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 fade-in">
            <div ref={modalRef} className="relative bg-white border border-gold/10 rounded-2xl shadow-2xl w-full max-w-[380px] px-6 py-8 sm:px-3 sm:py-5 modal-animate scale-in max-h-[90vh] overflow-y-auto">
              {/* Close button top left */}
        <button
                onClick={(e) => { handleModalRipple(e); setShowModal(false); }}
                className="absolute top-4 left-4 w-10 h-10 text-2xl text-gold hover:scale-110 hover:bg-gold/10 rounded-full flex items-center justify-center transition-all z-20 shadow"
                title="بستن"
              >
                {modalRippleStyle && (
                  <span
                    className="ripple"
                    style={{
                      top: modalRippleStyle.top,
                      left: modalRippleStyle.left,
                      width: modalRippleStyle.width,
                      height: modalRippleStyle.height,
                    }}
                  />
                )}
                ×
        </button>
              {/* Title */}
              <h3 className="text-2xl font-extrabold text-navy text-center mb-1">انتخاب نمودار</h3>
              <div className="w-14 h-1 bg-gold rounded-full mx-auto mb-3"></div>
              {/* Subtitle */}
              <div className="text-base text-gray-500 text-center mb-6">نمودارهای مورد نظر را انتخاب کنید</div>
              {/* Checkbox list */}
              <div className="space-y-3 max-h-[55vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gold/60 scrollbar-track-transparent pr-1">
        {Object.keys(visibleCharts).map((chartKey) => {
          const persianNames = {
            marketStatusChart: 'نمودار وضعیت بازار',
            callOptionYieldChart: 'نمودار بازدهی گزینه خرید',
            putOptionYieldChart: 'نمودار بازدهی گزینه فروش',
            orderBookChart: 'نمودار دفتر سفارشات',
            equityReturnsDiffChart: 'تفاوت بازدهی سهام',
                    ETFNAVChart: 'حباب NAV ETF',
            average: 'نوسان پذیری ضمنی',
            lastprice: 'موقعیت‌های باز',
            openinterest: 'بازدهی call و put',
            option: 'ارزش معاملات',
          };
          return (
                    <label key={chartKey} className="flex items-center gap-4 bg-gold/5 hover:bg-gold/10 border border-gold/10 rounded-xl px-4 py-3 font-bold text-navy cursor-pointer transition-all shadow-sm relative overflow-hidden">
              <input
                type="checkbox"
                checked={visibleCharts[chartKey]}
                onChange={() => handleCheckboxChange(chartKey)}
                        className="form-checkbox w-6 h-6 text-gold focus:ring-gold border-gold rounded transition-all duration-200"
              />
                      <span className="select-none">{persianNames[chartKey]}</span>
            </label>
          );
        })}
      </div>
              {/* Confirm button */}
              <button
                onClick={() => setShowModal(false)}
                className="mt-8 w-full bg-gold text-navy font-bold text-base py-2.5 rounded-xl shadow hover:bg-gold-dark hover:text-white transition-all"
              >
                تایید
              </button>
    </div>
  </div>
)}
        {/* Chart Grid با دسته‌بندی و divider */}
        <div className="space-y-16">
          {chartCategories.map((cat, idx) => {
            const visibleCatCharts = cat.keys.filter((key) => visibleCharts[key]);
            if (visibleCatCharts.length === 0) return null;
            return (
              <div key={cat.title}>
                <div className="flex items-center mb-8">
                  <div className="flex-1 h-px bg-gold/30 rounded-full"></div>
                  <span className="mx-4 text-2xl md:text-3xl font-extrabold text-navy drop-shadow-sm whitespace-nowrap">{cat.title}</span>
                  <div className="flex-1 h-px bg-gold/30 rounded-full"></div>
                </div>
                <TransitionGroup component={null}>
                  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                    {visibleCatCharts.map((chartKey) => (
                      <CSSTransition key={chartKey} timeout={500} classNames={{
                        enter: 'fade-in slide-in-up',
                        enterActive: '',
                        exit: 'fade-in',
                        exitActive: 'opacity-0 scale-95 duration-500',
                      }}>
              <ChartCard 
                chartKey={chartKey}
                chartData={charts[chartKey]}
                          handleCheckboxChange={handleCheckboxChange}
              />
                      </CSSTransition>
                    ))}
        </div>
                </TransitionGroup>
      </div>
            );
          })}
          {/* آزمایشی: ردیف چارت‌های تست */}
          <div>
            <div className="flex items-center mb-8">
              <div className="flex-1 h-px bg-gold/30 rounded-full"></div>
              <span className="mx-4 text-2xl md:text-3xl font-extrabold text-navy drop-shadow-sm whitespace-nowrap">آزمایشی</span>
              <div className="flex-1 h-px bg-gold/30 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {demoCharts.map((demo) => (
                <div key={demo.key} className="bg-white border border-gold/10 rounded-2xl shadow-lg px-8 py-10 min-h-[340px] flex flex-col hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(212,180,64,0.13)] transition-all duration-300 group relative fade-in slide-in-up">
                  <div className="text-center">
                    <span className="text-2xl md:text-3xl font-extrabold text-navy">{demo.title}</span>
                    <div className="w-12 h-1 bg-gold rounded-full mx-auto mt-2 mb-4"></div>
                  </div>
                  <div className="mt-2 flex-1">
                    <StockMarketEChart
                      type={demo.type}
                      data={demo.type === 'pie' ? demo.data : [{ name: demo.title, type: demo.type, data: demo.data }]}
                      categories={demo.categories}
                      title={demo.title}
                      height={320}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ChartCard component:
const ChartCard = ({ chartKey, chartData, handleCheckboxChange }) => {
  // Ripple state for close button
  const [closeRipple, setCloseRipple] = useState(null);
  const handleCloseRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    setCloseRipple({ top: y, left: x, width: size, height: size });
    setTimeout(() => setCloseRipple(null), 600);
  };
  // نام فارسی نمودارها
  const persianNames = {
    marketStatusChart: 'وضعیت بازار سهام',
    callOptionYieldChart: 'بازدهی اختیار خرید',
    putOptionYieldChart: 'بازدهی اختیار فروش',
    orderBookChart: 'دفتر سفارشات',
    equityReturnsDiffChart: 'تفاوت بازدهی سهام',
    ETFNAVChart: 'حباب NAV ETF',
    average: 'نوسان پذیری ضمنی',
    lastprice: 'موقعیت‌های باز',
    openinterest: 'بازدهی call و put',
    option: 'ارزش معاملات',
  };
  // Helper: summary info (latest value, percent change)
  function getSummary(chartKey, chartData) {
    if (!chartData || !chartData.data) return null;
    if (chartKey === 'marketStatusChart') {
      const last = chartData.data.datasets?.[0]?.data?.slice(-1)[0];
      const prev = chartData.data.datasets?.[0]?.data?.slice(-2)[0];
      if (last == null) return null;
      let diff = prev != null ? last - prev : 0;
      let percent = prev ? ((diff / prev) * 100).toFixed(2) : 0;
      let color = diff > 0 ? 'bg-green-100 text-green-700 border-green-300' : diff < 0 ? 'bg-red-100 text-red-700 border-red-300' : 'bg-gray-100 text-gray-700 border-gray-300';
      let arrow = diff > 0 ? '▲' : diff < 0 ? '▼' : '';
  return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-mono font-bold ${color} mt-2 mb-4 mx-auto`} style={{display:'block',width:'fit-content'}}>
          {arrow} {last}
          <span className="ltr:ml-1 rtl:mr-1">({percent}%)</span>
        </span>
      );
    }
    if (chartKey === 'ETFNAVChart') {
      const last = chartData.data.datasets?.[0]?.data?.slice(-1)[0];
      if (last == null) return null;
      let color = last > 0 ? 'bg-green-100 text-green-700 border-green-300' : last < 0 ? 'bg-red-100 text-red-700 border-red-300' : 'bg-gray-100 text-gray-700 border-gray-300';
      let arrow = last > 0 ? '▲' : last < 0 ? '▼' : '';
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-mono font-bold ${color} mt-2 mb-4 mx-auto`} style={{display:'block',width:'fit-content'}}>
          {arrow} {last}%
        </span>
      );
    }
    return null;
  }
  // اگر chartData یا chartData.options وجود نداشت، کارت را رندر نکن
  if (!chartData || !chartData.options) {
    return (
      <div className="bg-white border border-gold/10 rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center justify-center min-h-[220px]">
        <span className="text-gray-400 font-bold text-base text-center">داده‌ای برای نمایش وجود ندارد</span>
      </div>
    );
  }
  // جدول حرفه‌ای برای marketStatusChart و ETFNAVChart
  let table = null;
  if (chartKey === 'marketStatusChart' && chartData.data && chartData.data.labels && chartData.data.labels.length > 0) {
    table = (
      <div className="mb-4 overflow-x-auto">
        <table className="min-w-full rounded-xl overflow-hidden text-sm">
          <thead className="bg-white text-navy border-b-2 border-gold/20">
            <tr>
              <th className="px-3 py-2 font-bold">زمان</th>
              <th className="px-3 py-2 font-bold">آخرین قیمت</th>
              <th className="px-3 py-2 font-bold">قیمت پایانی</th>
            </tr>
          </thead>
          <tbody>
            {chartData.data.labels.map((label, idx) => {
              const last = chartData.data.datasets[0]?.data[idx];
              const prev = chartData.data.datasets[0]?.data[idx - 1];
              const diff = prev != null ? last - prev : 0;
              const color = diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-700';
              const arrow = diff > 0 ? '▲' : diff < 0 ? '▼' : '';
              return (
                <tr key={idx} className={idx === 0 ? 'bg-gold/10 font-bold' : idx % 2 === 0 ? 'bg-white' : 'bg-gold/5 hover:bg-gold/10'}>
                  <td className="px-3 py-2 font-mono">{label}</td>
                  <td className={`px-3 py-2 font-mono font-bold ${color}`}>{arrow} {last}</td>
                  <td className="px-3 py-2 font-mono font-bold text-navy">{chartData.data.datasets[1]?.data[idx]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  if (chartKey === 'ETFNAVChart' && chartData.data && chartData.data.labels && chartData.data.labels.length > 0) {
    table = (
      <div className="mb-4 overflow-x-auto">
        <table className="min-w-full rounded-xl overflow-hidden text-sm">
          <thead className="bg-white text-navy border-b-2 border-gold/20">
            <tr>
              <th className="px-3 py-2 font-bold">نماد</th>
              <th className="px-3 py-2 font-bold">درصد حباب</th>
            </tr>
          </thead>
          <tbody>
            {chartData.data.labels.map((label, idx) => {
              const value = chartData.data.datasets[0]?.data[idx];
              const color = value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-700';
              const arrow = value > 0 ? '▲' : value < 0 ? '▼' : '';
              return (
                <tr key={idx} className={idx === 0 ? 'bg-gold/10 font-bold' : idx % 2 === 0 ? 'bg-white' : 'bg-gold/5 hover:bg-gold/10'}>
                  <td className="px-3 py-2 font-mono">{label}</td>
                  <td className={`px-3 py-2 font-mono font-bold ${color}`}>{arrow} {value}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  // Log chartData for debugging
  console.log('chartData', chartData);

  // Sanitize datasets and labels
  const safeDatasets = (chartData.data.datasets || []).map(ds => ({
    name: typeof ds.label === 'string' ? ds.label : '',
    type: chartData.options.type === 'bar' ? 'bar' : 'line',
    data: Array.isArray(ds.data) ? ds.data.map(d => (typeof d === 'number' ? d : (typeof d === 'string' ? Number(d) : null))) : [],
  }));

  const safeLabels = Array.isArray(chartData.data.labels)
    ? chartData.data.labels.map(l => (typeof l === 'string' ? l : (typeof l === 'number' ? String(l) : '')))
    : [];

  // If no data, show a friendly message instead of the chart
  if (!safeDatasets.length || !safeLabels.length) {
  return (
      <div className="bg-white border border-gold/10 rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center justify-center min-h-[220px]">
        <span className="text-gray-400 font-bold text-base text-center">داده‌ای برای نمایش وجود ندارد</span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gold/10 rounded-2xl shadow-lg px-8 py-10 min-h-[340px] flex flex-col hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(212,180,64,0.13)] transition-all duration-300 group relative fade-in slide-in-up">
      {/* Close button top right */}
      <button
        onClick={(e) => { handleCloseRipple(e); handleCheckboxChange(chartKey); }}
        className="absolute top-4 right-4 text-navy hover:bg-gold/10 rounded-full w-8 h-8 flex items-center justify-center transition-all text-lg relative overflow-hidden z-10"
        title="حذف نمودار"
      >
        {closeRipple && (
          <span
            className="ripple"
            style={{
              top: closeRipple.top,
              left: closeRipple.left,
              width: closeRipple.width,
              height: closeRipple.height,
            }}
          />
        )}
        ×
      </button>
      {/* Card title centered with gold underline accent */}
      <div className="text-center">
        <span className="text-2xl md:text-3xl font-extrabold text-navy">
          {persianNames[chartKey]}
        </span>
        <div className="w-12 h-1 bg-gold rounded-full mx-auto mt-2 mb-4"></div>
        {getSummary(chartKey, chartData)}
      </div>
      {table}
      <div className="mt-2 flex-1">
        <StockMarketEChart
          type={chartData.options.type === 'bar' ? 'bar' : 'line'}
          data={safeDatasets}
          categories={safeLabels}
          title={chartData.options.plugins?.title?.text || ''}
          height={320}
        />
      </div>
    </div>
  );
};
export default MainPage;