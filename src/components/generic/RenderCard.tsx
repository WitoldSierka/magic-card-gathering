import React from 'react';
import CardTemplate from '../CardTemplate';

type MyProps = {
  card: CardTemplate,
  nameOfClass: string,
  onSelected?: any,
  isSelectable: boolean
}
type MyState = {
  isSelected: boolean,
  count: number
}

class RenderCard extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      isSelected: false,
      count: 0
    }
  }
  componentDidMount(): void {
    //console.log("RENDERED NEW CARD", this.props.card.multiverseid);
  }
  selectorManager = () => {
    this.setState((state) => {
      return {isSelected: !state.isSelected};
    })
  }
  
  componentDidUpdate(prevProps: MyProps, prevState: MyState): void {
    if (prevState.isSelected !== this.state.isSelected) {
      //console.log("BEFORE SEND",prevState);
      const cardData = {
        status: this.state.isSelected,
        cardObj: this.props.card
      };
      this.props.onSelected(cardData);
      //console.log("AFTER SEND", cardData, this.state);
    } else if (prevProps.isSelectable !== this.props.isSelectable) {
      //console.log("PROPS UPDATE");
      this.setState({isSelected: false});
    }
  }

  render() {
    return (
      <div 
        className={`${this.props.nameOfClass} ${this.props.card.multiverseid} ${this.props.isSelectable && this.state.isSelected && "selected-card"}`} 
        onClick={this.props.isSelectable? this.selectorManager : () => {} }
      >
        <img src={`${this.props.card.imageUrl}`} title={this.props.card.originalText} alt="oops card eaten"/>
      </div>
    );
  }
}

export default RenderCard;