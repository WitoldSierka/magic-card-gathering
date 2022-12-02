import React from "react";

interface MyProps{
  label: string,
  designation: string,
  onCheckboxManager: any
}
interface MyState{
  isChecked: boolean
}
class Checkbox extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      isChecked: false
    }
  }

  checkboxManager = () => {
    this.setState((prevState) => {
      return {isChecked: !prevState.isChecked}
    });
  }

  componentDidUpdate(prevProps: MyProps, prevState: MyState): void {
    if (prevState.isChecked !== this.state.isChecked) {
      const checkboxData = {
        whatValue: this.props.label,
        status: this.state.isChecked
      }
      this.props.onCheckboxManager(checkboxData);
      console.log(checkboxData);
    }
  }

  render() {
    return (
      <div className={`checkbox-wrapper-${this.props.designation}`} >
        <label>
          <input type="checkbox" checked={this.state.isChecked} value={this.props.label} onChange={this.checkboxManager} />
          <span>{this.props.label}</span>
        </label>
      </div>
    );    
  }
};

export default Checkbox;