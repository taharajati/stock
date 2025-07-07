import React from 'react';
import ReactECharts from 'echarts-for-react';

// Modern color palette for series
const MODERN_COLORS = [
  '#2979FF', // blue
  '#00B8D4', // cyan
  '#FFD600', // yellow
  '#FF7043', // orange
  '#43A047', // green
  '#D500F9', // purple
  '#FF1744', // red
  '#00E676', // light green
  '#FF6D00', // deep orange
  '#1DE9B6', // teal
];
const BG_GRADIENT = {
  type: 'linear',
  x: 0, y: 0, x2: 0, y2: 1,
  colorStops: [
    { offset: 0, color: '#fff' },
    { offset: 1, color: '#f6f8fa' },
  ],
};
const AXIS_LABEL = '#222c3c';
const AXIS_LINE = '#e0e6ed';
const GRID_LINE = '#f0f2f5';
const TITLE_COLOR = '#222c3c';
const SHADOW = '0 4px 24px 0 rgba(30,34,90,0.07)';

const StockMarketEChart = ({
  type = 'line',
  data = [],
  categories = [],
  title = '',
  annotations = [],
  height = 400,
  optionOverrides = {},
  rtl = true,
}) => {
  // Guard: if data is not an array, show error
  if (!Array.isArray(data)) {
    return (
      <div className="rounded-2xl shadow-2xl overflow-hidden border border-red-400 bg-white text-red-400 p-6 text-center font-bold">
        فرمت داده نمودار اشتباه است (data باید آرایه باشد)
      </div>
    );
  }

  let option = {
    backgroundColor: BG_GRADIENT,
    title: {
      text: title,
      left: rtl ? 'right' : 'left',
      textStyle: {
        color: TITLE_COLOR,
        fontFamily: 'Vazir, tahoma, Arial, sans-serif',
        fontWeight: 700,
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#e0e6ed',
      borderWidth: 1,
      textStyle: { color: AXIS_LABEL, fontFamily: 'Vazir, tahoma, Arial, sans-serif' },
      extraCssText: 'box-shadow: 0 4px 24px 0 rgba(30,34,90,0.07);',
    },
    grid: { left: 40, right: 40, top: 60, bottom: 40, containLabel: true },
    xAxis: {
      type: type === 'candlestick' ? 'category' : 'category',
      data: categories,
      axisLabel: {
        color: AXIS_LABEL,
        fontFamily: 'Vazir, tahoma, Arial, sans-serif',
        fontWeight: 500,
        fontSize: 13,
        align: rtl ? 'right' : 'left',
      },
      axisLine: { lineStyle: { color: AXIS_LINE, width: 1 } },
      axisTick: { show: false },
      splitLine: { show: false },
      inverse: rtl,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: AXIS_LABEL,
        fontFamily: 'Vazir, tahoma, Arial, sans-serif',
        fontWeight: 500,
        fontSize: 13,
      },
      splitLine: { lineStyle: { color: GRID_LINE, width: 1 } },
      axisLine: { lineStyle: { color: AXIS_LINE, width: 1 } },
      axisTick: { show: false },
    },
    series: [],
    color: MODERN_COLORS,
    textStyle: {
      fontFamily: 'Vazir, tahoma, Arial, sans-serif',
    },
    animationDuration: 800,
  };

  // --- Fix: support both single and multi-series ---
  let isMultiSeries = Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0].data;
  if (isMultiSeries) {
    // Multi-series: data is array of {name, type, data}
    option.series = data.map((series, idx) => ({
      ...series,
      type: series.type || type,
      smooth: type === 'line',
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        color: MODERN_COLORS[idx % MODERN_COLORS.length],
        width: 3,
        shadowColor: MODERN_COLORS[idx % MODERN_COLORS.length] + '33',
        shadowBlur: 4,
      },
      itemStyle: {
        color: MODERN_COLORS[idx % MODERN_COLORS.length],
        borderColor: '#fff',
        borderWidth: 2,
        shadowColor: MODERN_COLORS[idx % MODERN_COLORS.length] + '22',
        shadowBlur: 4,
      },
      areaStyle: type === 'line' ? {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: MODERN_COLORS[idx % MODERN_COLORS.length] + '22' },
            { offset: 1, color: 'rgba(255,255,255,0.0)' },
          ],
        },
      } : undefined,
      emphasis: { focus: 'series' },
      markLine: {
        data: annotations.map(a => ({ xAxis: a.x, label: { formatter: a.label, color: a.color || MODERN_COLORS[idx % MODERN_COLORS.length] }, lineStyle: { color: a.color || MODERN_COLORS[idx % MODERN_COLORS.length], width: 2, type: a.dash || 'dashed' } })),
        symbol: 'none',
      },
    }));
  } else if (Array.isArray(data)) {
    // Single series: data is array of numbers
    option.series = [
      {
        name: title || 'Series',
        type,
        data,
        smooth: type === 'line',
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: MODERN_COLORS[0],
          width: 3,
          shadowColor: MODERN_COLORS[0] + '33',
          shadowBlur: 4,
        },
        itemStyle: {
          color: MODERN_COLORS[0],
          borderColor: '#fff',
          borderWidth: 2,
          shadowColor: MODERN_COLORS[0] + '22',
          shadowBlur: 4,
        },
        areaStyle: type === 'line' ? {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: MODERN_COLORS[0] + '22' },
              { offset: 1, color: 'rgba(255,255,255,0.0)' },
            ],
          },
        } : undefined,
        emphasis: { focus: 'series' },
        markLine: {
          data: annotations.map(a => ({ xAxis: a.x, label: { formatter: a.label, color: a.color || MODERN_COLORS[0] }, lineStyle: { color: a.color || MODERN_COLORS[0], width: 2, type: a.dash || 'dashed' } })),
          symbol: 'none',
        },
      },
    ];
  }

  // Pie and candlestick minimal style
  if (type === 'pie') {
    option.series = [
      {
        name: title || 'Pie',
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        data: data,
        label: {
          color: AXIS_LABEL,
          fontFamily: 'Vazir, tahoma, Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: 15,
        },
        labelLine: {
          lineStyle: {
            color: AXIS_LINE,
            width: 1,
          },
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          shadowBlur: 6,
          shadowColor: 'rgba(30,34,90,0.07)',
        },
        emphasis: {
          scale: true,
          itemStyle: {
            shadowBlur: 12,
            shadowOffsetX: 0,
            shadowColor: 'rgba(30,34,90,0.13)',
          },
        },
      },
    ];
  } else if (type === 'candlestick') {
    option.series = [
      {
        name: title || 'کندل',
        type: 'candlestick',
        data: data,
        itemStyle: {
          color: '#43A047',
          color0: '#FF7043',
          borderColor: '#43A047',
          borderColor0: '#FF7043',
          borderWidth: 2,
          shadowBlur: 4,
          shadowColor: 'rgba(30,34,90,0.07)',
        },
        markLine: {
          data: annotations.map(a => ({ xAxis: a.x, label: { formatter: a.label, color: a.color || '#2979FF' }, lineStyle: { color: a.color || '#2979FF', width: 2, type: a.dash || 'dashed' } })),
          symbol: 'none',
        },
      },
    ];
  }

  // Allow user to override any option
  option = { ...option, ...optionOverrides };

  return (
    <div className="rounded-2xl overflow-hidden" style={{background: 'linear-gradient(180deg, #fff 0%, #f6f8fa 100%)', boxShadow: SHADOW}}>
      <ReactECharts option={option} style={{ height: height, width: '100%', background: 'transparent' }} theme={null} />
    </div>
  );
};

// Demo usage (remove in production)
export const DemoStockMarketLineChart = () => {
  const categories = ['1402/01', '1402/02', '1402/03', '1402/04', '1402/05', '1402/06', '1402/07'];
  const data = [120, 132, 101, 134, 90, 230, 210];
  const annotations = [
    { x: '1402/04', label: 'سیگنال خرید', color: '#00e676', dash: 'solid' },
    { x: '1402/06', label: 'سیگنال فروش', color: '#ff1744', dash: 'dashed' },
  ];
  return (
    <StockMarketEChart
      type="line"
      data={data}
      categories={categories}
      title="نمودار قیمت سهم نمونه"
      annotations={annotations}
      height={400}
      rtl={true}
    />
  );
};

export default StockMarketEChart; 