import React, { useState, useEffect } from "react";

const Checkbox: React.FC<{label: string, designation: string, onCheckboxManager: any}> = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxManager = () => {
    setIsChecked((prev) => !prev);
  }
  useEffect(() => {
    const checkboxData = {
      whatValue: props.label,
      status: isChecked
    }
    props.onCheckboxManager(checkboxData);
  }, [isChecked]);

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