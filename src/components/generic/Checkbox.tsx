import React, { useState } from "react";

const Checkbox: React.FC<{label: string, designation: string, onCheckboxManager: any}> = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxManager = () => {
    const checkboxData = {
      whatValue: props.label,
      status: !isChecked
    }
    setIsChecked((prev) => !prev);
    props.onCheckboxManager(checkboxData);
  }

  return (
    <div className={`checkbox-wrapper-${props.designation}`} >
      <label>
        <input type="checkbox" checked={isChecked} value={props.label} onChange={checkboxManager} />
        <span>{props.label}</span>
      </label>
    </div>
  );
};

export default Checkbox;