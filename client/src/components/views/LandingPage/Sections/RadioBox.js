import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox({ list, handleFilters }) {
  const [Value, setValue] = useState(0);
  const renderRadioBox = () =>
    list &&
    list.map((price, index) => (
      <Radio key={price._id} value={`${price._id}`}>
        {price.name}
      </Radio>
    ));

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFilters(e.target.value);
  };

  return (
    <Collapse defaultActiveKey={['0']} onChange>
      <Panel header="Price" key="1">
        <Radio.Group onChange={handleChange} value={Value}>
          {renderRadioBox()}
        </Radio.Group>
      </Panel>
    </Collapse>
  );
}

export default RadioBox;
