import React, { useEffect, useState } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  ema,
  elderRay,
} from "react-financial-charts";

const ChartComponent = ({ initialData }) => {
  const [data, setData] = useState([]);
  const [ema12, setEma12] = useState(null);
  const [ema26, setEma26] = useState(null);
  const [elder, setElder] = useState(null);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const ema12Calc = ema()
        .id(1)
        .options({ windowSize: 12 })
        .merge((d, c) => {
          d.ema12 = c;
        })
        .accessor((d) => d.ema12);

      const ema26Calc = ema()
        .id(2)
        .options({ windowSize: 26 })
        .merge((d, c) => {
          d.ema26 = c;
        })
        .accessor((d) => d.ema26);

      const elderCalc = elderRay();

      const calculatedData = elderCalc(ema26Calc(ema12Calc(initialData)));

      setEma12(ema12Calc);
      setEma26(ema26Calc);
      setElder(elderCalc);
      setData(calculatedData);
    }
  }, [initialData]);

  if (!data || data.length === 0 || !ema12 || !ema26 || !elder) {
    return <div>No data available</div>;
  }

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => new Date(d.date)
  );
  const height = 700;
  const width = 900;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  const { data: finalData, xScale, xAccessor, displayXAccessor } = ScaleProvider(data);

  const pricesDisplayFormat = format(".2f");
  const max = xAccessor(finalData[finalData.length - 1]);
  const min = xAccessor(finalData[Math.max(0, finalData.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;
  const elderRayHeight = 100;
  const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;
  const yExtents = (data) => [data.high, data.low];
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);
  const barChartExtents = (data) => data.volume;
  const candleChartExtents = (data) => [data.high, data.low];
  const yEdgeIndicator = (data) => data.close;
  const volumeColor = (data) =>
    data.close > data.open ? "rgba(38, 166, 154, 0.3)" : "rgba(239, 83, 80, 0.3)";
  const volumeSeries = (data) => data.volume;
  const openCloseColor = (data) => (data.close > data.open ? "#26a69a" : "#ef5350");

  return (
    <ChartCanvas
      height={height}
      ratio={3}
      width={width}
      margin={margin}
      data={finalData}
      displayXAccessor={displayXAccessor}
      seriesName="Data"
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
    >
      <Chart id={2} height={barChartHeight} origin={barChartOrigin} yExtents={barChartExtents}>
        <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
      </Chart>
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis showGridLines showTickLabel={false} />
        <YAxis showGridLines tickFormat={pricesDisplayFormat} />
        <CandlestickSeries />
        <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
        <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
        <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
        <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
        <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={pricesDisplayFormat}
          yAccessor={yEdgeIndicator}
        />
        <MovingAverageTooltip
          origin={[8, 24]}
          options={[
            {
              yAccessor: ema26.accessor(),
              type: "EMA",
              stroke: ema26.stroke(),
              windowSize: ema26.options().windowSize,
            },
            {
              yAccessor: ema12.accessor(),
              type: "EMA",
              stroke: ema12.stroke(),
              windowSize: ema12.options().windowSize,
            },
          ]}
        />
        <ZoomButtons />
        <OHLCTooltip origin={[8, 16]} />
      </Chart>
      <Chart
        id={4}
        height={elderRayHeight}
        yExtents={[0, elder.accessor()]}
        origin={elderRayOrigin}
        padding={{ top: 8, bottom: 8 }}
      >
        <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
        <YAxis
          ticks={4}
          tickFormat={pricesDisplayFormat}
          tickStroke="#000000"
          gridLinesStrokeStyle="#e0e3eb"
        />
        <ElderRaySeries yAccessor={elder.accessor()} />
        <SingleValueTooltip
          yAccessor={elder.accessor()}
          yLabel="Elder Ray"
          yDisplayFormat={pricesDisplayFormat}
          origin={[8, 16]}
        />
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
};

export default ChartComponent;


// import React from "react";
// import ReactDOM from "react-dom";
// import ChartComponent from "./ChartComponent";

// const apiResponse = [
//   {
//     adjclose: 82.86478424072266,
//     close: 83.9000015258789,
//     date: "2023-04-11T03:45:00.000Z",
//     high: 85.69999694824219,
//     low: 81,
//     open: 81,
//     volume: 199204
//   }
//   // Add more data points as needed
// ];

// const priceData = apiResponse.map(item => [new Date(item.date).getTime(), item.close]);

// ReactDOM.render(
//   <ChartComponent priceData={priceData} />,
//   document.getElementById("root")
// );
