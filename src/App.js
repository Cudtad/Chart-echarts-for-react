import "./styles.css";

import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";

export default function App() {
  const data = [];
  const startDate = new Date("August 1, 2023 00:00:00");
  let fixValue = 23000;
  const length = 288;
  for (let i = 0; i < length; i++) {
    let item = [];
    let date = new Date(startDate);
    date.setMinutes(date.getMinutes() + 30 * i);
    item.push(date);
    if (i % 50 === 0) {
      fixValue += 100;
    }
    item.push(fixValue);
    data.push(item);
  }

  const options = {
    grid: { top: 8, right: 8, bottom: 25, left: 70 },
    xAxis: [
      {
        data: data?.map((item) => {
          // return dayjs(item[0]).format("DD MMM'YY . HH:mm");
          const date = new Date(item[0]);

          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const isNewYears =
            month === 1 && day === 1 && hours === 0 && minutes === 0;
          const isNewMonth = day === 1 && hours === 0 && minutes === 0;

          if (isNewYears) {
            return dayjs(date).format("YYYY");
          } else if (isNewMonth) {
            return dayjs(date).format("MMM");
          } else if (hours === 0 && minutes === 0) {
            return dayjs(date).format("D");
          } else {
            return dayjs(date).format("HH:mm");
          }
        }),
        type: "category",
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 100,
        min: "dataMin",
        max: "dataMax",
        minInterval: 10,
        axisPointer: {
          z: 100
        },
        axisLabel: {
          interval: (valueIndex, value) => {
            const regexNumber = /[0-9]/;
            const regexRange = /[1-31]/g;
            const regexText = /[a-zA-Z]/;

            if (value.length === 4 && regexNumber.test(value)) {
              return true;
            } else if (regexRange.test(value) && value.length < 2) {
              return true;
            } else if (regexText.test(value)) {
              return true;
            } else {
              return valueIndex % 24 === 0 ? true : false;
            }
          }
        }
      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true
        }
      }
    ],
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 50,
        end: 100
        // filterMode: 'none'
      }
    ],
    series: [
      {
        data: data.map((item) => {
          return item[1];
        }),
        type: "line",
        smooth: false,
        symbol: "none"
      }
    ],
    tooltip: {
      trigger: "axis"
    }
  };

  return <ReactECharts option={options} />;
}
