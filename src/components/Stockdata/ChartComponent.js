import React from 'react';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { LineSeries } from 'react-stockcharts/lib/series'; // Update import path based on actual library structure
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'; // Update import path based on actual library structure
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'; // Use HoverTooltip or another appropriate tooltip
import { sma } from 'react-stockcharts/lib/indicator'; // Import sma function
import { scaleLinear } from 'd3-scale';
import { timeFormat } from 'd3-time-format';

// Define moving average configuration if required
const maConfig = {
  windowSize: 20,
  stroke: 'blue',
};

const StockChart = ({ data, width, height, theme, indicators }) => {
  // Data preparation
  const preparedData = data.map(item => ({
    date: new Date(item.date),
    close: item.close,
    // Add other data points as needed
  }));

  // Calculate moving average
  const movingAverage = sma()
    .options({ windowSize: maConfig.windowSize })
    .merge((d, c) => { d.movingAverage = c; })
    .accessor(d => d.movingAverage)
    .calculate(preparedData);

  // Scale configuration
  const xScale = scaleLinear()
    .domain([preparedData[0].date, preparedData[preparedData.length - 1].date])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([Math.min(...preparedData.map(d => d.close)), Math.max(...preparedData.map(d => d.close))])
    .range([height, 0]);

  return (
    <ChartCanvas
      width={width}
      height={height}
      margin={{ left: 60, right: 20, top: 20, bottom: 30 }}
      xScale={xScale}
      yScale={yScale}
      seriesName="Stock Data"
      data={preparedData}
      xAccessor={d => d.date}
      yAccessor={d => d.close}
    >
      <Chart
        id={0}
        yExtents={[d => d.close, d => d.movingAverage]}
      >
        <XAxis axisAt="bottom" orient="bottom" tickFormat={timeFormat('%Y-%m-%d')} />
        <YAxis axisAt="left" orient="left" />
        <LineSeries
          yAccessor={d => d.close}
          stroke="blue"
        />
        <LineSeries
          yAccessor={d => d.movingAverage}
          stroke={maConfig.stroke}
        />
        {/* {indicators.map((indicator, index) => {
          const IndicatorComponent = indicator.type;
          return <IndicatorComponent key={index} {...indicator} data={preparedData} />;
        })} */}
        <HoverTooltip />
      </Chart>
    </ChartCanvas>
  );
};

export default StockChart;
