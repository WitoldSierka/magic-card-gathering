import React from "react";
import "./styles/ChartBar.css"

interface MyProps{
  label: any,
  maxValue: number,
  value: number
}

const Chartbar: React.FC<MyProps> = (props) => {
  let barFillHeight = '0%';

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div className="chart-bar__fill" style={{height: barFillHeight}}></div>
      </div>
      <div className="chart-bar__label">mana: {props.label}</div>
    </div>
  )
}

export default Chartbar;