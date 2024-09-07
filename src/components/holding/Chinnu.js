// import React, { useState, useEffect } from "react";
//  <Select 
//               fullWidth
//               variant="outlined"
//               label="Transaction Code"
//               value={formData.tran_code}
//               placeholder="Transaction Type"
//               onChange={(event) =>
//                 handleChange({ target: { name: "tran_code", value: event.target.value } })
//               }
//               name="tran_code"
//               sx={{ mb: 3 }}
//             >
//               {trancodeData.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>





import React, { useState, useMemo } from 'react';
import Select, { components } from 'react-select';
import { FixedSizeList as List } from 'react-window';

const Chinnu = ({ options, onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (onSelectChange) {
      onSelectChange(selected); // Call the parent callback with the selected option
    }
  };

  const filterOption = (candidate, inputValue) => {
    const symbol = candidate.data.data.symbol.toLowerCase();
    const shortname = candidate.data.data.shortname.toLowerCase();
    const searchValue = inputValue.toLowerCase();
    return symbol.includes(searchValue) || shortname.includes(searchValue);
  };
  const truncateLabel = (label, maxLength) => {
    if (label.length > maxLength) {
      return `${label.slice(0, maxLength)}...`;
    }
    return label;
  };
  const formattedOptions = useMemo(() =>
    options.map(option => ({
      value: option.symbol,
      label: truncateLabel(`${option.symbol} - ${option.shortname}`, 14),
      data: option
    })),
    [options]
  );

  const MenuList = props => {
    const { options, children, maxHeight } = props;
    const height = 35;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={formattedOptions}
      filterOption={filterOption}
      placeholder="Select a symbol or shortname"
      components={{ MenuList }}
      className="custom-select, chinnu"
      classNamePrefix="custom"
    />

  );
};

export default Chinnu;
