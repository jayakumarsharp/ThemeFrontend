import React, { useState, useMemo } from 'react';
import Select, { components } from 'react-select';
import { FixedSizeList as List } from 'react-window';

const Dropdown = ({ options, onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (onSelectChange) {
      onSelectChange(selected); // Call the parent callback with the selected option
    }
  };

  const filterOption = (candidate, inputValue) => {
    const symbol = candidate.data.data.symbol.toLowerCase();
    const longname = candidate.data.data.longname.toLowerCase();
    const searchValue = inputValue.toLowerCase();
    return symbol.includes(searchValue) || longname.includes(searchValue);
  };

  const formattedOptions = useMemo(() =>
    options.map(option => ({
      value: option.symbol,
      label: `${option.symbol} - ${option.longname}`,
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
      placeholder="Select a symbol or longname"
      components={{ MenuList }}
    />
  );
};

export default Dropdown;
