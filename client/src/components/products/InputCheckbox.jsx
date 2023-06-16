import React from "react";

function InputCheckbox({
  value,
  id,
  checking,
  index,
  category,
  onChangeHanlde,
}) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        name="filter"
        value={value}
        checked={checking}
        onChange={onChangeHanlde}
      />
      <label htmlFor={`${category}-${index}`}>{value}</label>
    </>
  );
}

export default InputCheckbox;
