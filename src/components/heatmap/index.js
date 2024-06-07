import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { HeatMapGrid } from "react-grid-heatmap";

const HeatMapComponent = () => {
 
  const xLabels = ["", "", "", "", "", "", "", "", "", ""];
  const yLabels = ["", "", "", "", ""];
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 5 - 2)));
  console.log(data);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        // Reder cell with tooltip
        cellRender={(x, y, value) => <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>}
        xLabelsStyle={(index) => ({
          color: index % 2 ? "transparent" : "#777",
          fontSize: ".65rem",
        })}
        yLabelsStyle={() => ({
          fontSize: ".65rem",
          textTransform: "uppercase",
          color: "#777",
        })}
        cellStyle=//   fontSize: ".7rem", //   background: `rgb(12, 160, 44, ${ratio})`, // {(_x, _y, ratio) => ({
        //   color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
        // })}

        {(_x, _y, ratio) => {
          debugger;
          let value_float = 0;
          // Get value from the data array
          if (data.length > 0) {
            const value = data[_x][_y];
            value_float = parseFloat(value);
          }

          const color =
            value_float >= 0
              ? `rgba(12, 160, 44, ${Math.abs(ratio)})`
              : `rgba(215, 64, 98, ${1 - Math.abs(ratio)})`;

          return {
            background: color,
            fontSize: ".8rem",
            font: "bold",
            color: `rgb(0, 0, 0, ${Math.abs(ratio) / 2 + 0.4})`,
          };
        }}
        cellHeight="4rem"
        xLabelsPos="bottom"
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
        // yLabelsPos="right"
        // square
      />
    </DashboardLayout>
  );
};

export default HeatMapComponent;
