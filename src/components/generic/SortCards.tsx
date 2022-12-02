import React from "react";
import CardTemplate from "../CardTemplate";

interface MyProps{
  onSelectedSorting: any,
  arrayOfCards: CardTemplate[],
  selectedSort?: string
}
interface MyState {
  selectedSort: string
}

class SortCards extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      selectedSort: "default"
    }
  }
  
  sortHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState((state) => {return {selectedSort: event.target.value}});
    //console.log(this.state.selectedSort);
  }

  sortCardsByMana = (arr: CardTemplate[], isIncreasing: boolean): CardTemplate[] => {
    let tempArr = arr.map(card => {
      let cardsMana = 0;
      if (card.manaCost !== undefined) {
        cardsMana += card.manaCost.length / 3;
        if (!Number.isNaN(Number(card.manaCost[1]))) {
          cardsMana += Number(card.manaCost[1]) - 1;
        }
      }
      card.comparableMana = cardsMana;
      return card;
    })
    if (isIncreasing) {
      tempArr.sort((a, b) => a.comparableMana! - b.comparableMana!);
      return tempArr;
    } else {
      tempArr.sort((a, b) => b.comparableMana! - a.comparableMana!);
      return tempArr;
    }
  }

  componentDidUpdate(prevProps: MyProps, prevState: MyState): void {
   /*if (prevProps.selectedSort !== this.props.selectedSort) {
    
   }*/
   if (prevState.selectedSort !== this.state.selectedSort) {
    console.log("UPDATE", this.state.selectedSort)
    switch (this.state.selectedSort) {
      case "mana-cost-inc":
        const sorted = this.sortCardsByMana(this.props.arrayOfCards, true);
        this.props.onSelectedSorting(sorted);
        break;
      case "mana-cost-dec":
        this.sortCardsByMana(this.props.arrayOfCards, false);
        break;
      default:
        this.props.onSelectedSorting(this.props.arrayOfCards);
        break;
    }    
   }
  }

  render() {
    return (
      <div className="sort-cards">
        <label>Sort Cards</label>
        <select value={this.state.selectedSort} onChange={this.sortHandler}>
          <option value="default">default</option>
          <option value="mana-cost-inc">mana cost increasing</option>
          <option value="mana-cost-dec">mana cost decreasing</option>
          <option value="nameAZ">name A - Z</option>
          <option value="nameZA">name Z - A</option>
          <option value="typeAZ">types A - Z</option>
          <option value="typeZA">types Z - A</option>
        </select>
      </div>
    )
  }
}

export default SortCards;