import React from "react";
import CardTemplate from "../CardTemplate";

interface MyProps{
  onSelectedSorting: any,
  arrayOfCards?: CardTemplate[],
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

  componentDidUpdate(prevProps: MyProps, prevState: MyState): void {
   /*if (prevProps.selectedSort !== this.props.selectedSort) {
    
   }*/
   if (prevState.selectedSort !== this.state.selectedSort) {
    console.log("UPDATE", this.state.selectedSort)
    this.props.onSelectedSorting(this.state.selectedSort);
    /*switch (this.state.selectedSort) {
      case "mana-cost-inc":
        this.props.onSelectedSorting(this.props.arrayOfCards.sort((a, b) => a.cmc! - b.cmc!));
        break;
      case "mana-cost-dec":
        this.props.onSelectedSorting(this.props.arrayOfCards.sort((a, b) => b.cmc! - a.cmc!));
        break;
      case "nameAZ":
        this.props.onSelectedSorting(this.props.arrayOfCards.sort((a, b) => a.name!.localeCompare(b.name!)));
        break;
      case "nameZA":
        this.props.onSelectedSorting(this.props.arrayOfCards.sort((a, b) => b.name!.localeCompare(a.name!)));
        break;
      case "typeAZ":
        this.props.onSelectedSorting(this.props.arrayOfCards.sort((a, b) => a.type!.localeCompare(b.type!)));
        break;
      case "typeZA":
        this.props.onSelectedSorting(this.props.arrayOfCards.sort((a, b) => b.type!.localeCompare(a.type!)));
        break;
      default:
        this.props.onSelectedSorting(this.props.arrayOfCards);
        break;
    }    */
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