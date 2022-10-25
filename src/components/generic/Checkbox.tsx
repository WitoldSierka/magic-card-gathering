import React, { useState } from "react";

const Checkbox: React.FC<{label: string, designation: string, onCheckboxManager: any}> = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  //const [checkboxValue, setCheckboxValue] = useState(props.label);

  const checkboxManager = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked((prev) => !prev);
    if (isChecked) {
      props.onCheckboxManager(event.target.value);
    }
  }

  return (
    <div className={`checkbox-wrapper-${props.designation}`} key={`${props.designation}/${props.label}`} >
      <label>
        <input type="checkbox" checked={isChecked} value={props.label} onChange={checkboxManager} />
        <span>{props.label}</span>
      </label>
    </div>
  );
};

export default Checkbox;