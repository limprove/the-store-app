import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature({ refreshFunction }) {
  const [SearchTerm, setSearchTerm] = useState('');

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
    refreshFunction(e.target.value);
  };

  return (
    <Search
      placeholder="input search text"
      onChange={searchHandler}
      style={{ width: 200 }}
      value={SearchTerm}
    />
  );
}

export default SearchFeature;
