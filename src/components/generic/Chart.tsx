import React from "react";
import ChartBar from "./ChartBar"
import "./styles/Chart.css"

interface DataPoint{
    label: string,
    value: number,
    maxValue: number
}
interface MyProps{
  dataPoints: DataPoint[]
}

const Chart: React.FC<MyProps> = (props) => {
  
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint: DataPoint) =>(
        <ChartBar 
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={dataPoint.maxValue}
          label={dataPoint.label}
        />
      ))}
    </div>
  )
}

export default Chart;