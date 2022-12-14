import React from "react"
import CardTemplate from "../CardTemplate";

import Chart from "../generic/Chart";

interface MyProps {
  arrayOfCards: CardTemplate[];
}
interface DataPoint{
  label: string, //iterated mana cost
  value: number, //number of cards with above mana cost
  maxValue: number //number of all cards
}

const ManaCostChart: React.FC<MyProps> = (props) => {
  let finalManaColumns: DataPoint[] = [];
  let manaCostInColumns: Map<string, number> = new Map();
  let maxCards: number = 0;
  props.arrayOfCards.forEach((card: CardTemplate) => {
    const cardLabel = card.cmc!.toString();
    if (manaCostInColumns.has(cardLabel)) {
      manaCostInColumns.set(cardLabel, manaCostInColumns.get(cardLabel)! + 1);
    } else {
      manaCostInColumns.set(cardLabel, 1);
    }
    if (maxCards < manaCostInColumns.get(cardLabel)!) {
      maxCards = manaCostInColumns.get(cardLabel)!;
    }
  })
  manaCostInColumns.forEach((key, value) => {
    const column = {maxValue: maxCards, label: value, value: key};
    finalManaColumns.push(column);
  })
  finalManaColumns.sort((a, b) => Number(a.label) - Number(b.label));
  
  return (
    <Chart 
      dataPoints={finalManaColumns}
    />
  )
}

export default ManaCostChart;