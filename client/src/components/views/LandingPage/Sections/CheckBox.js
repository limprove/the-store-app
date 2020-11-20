import React, { useState } from 'react';
import { Collapse, Checkbox, Row, Col } from 'antd';

const { Panel } = Collapse;

function CheckBox({ list, handleFilters }) {
  const [checkList, setCheckList] = useState([]);

  const toggleHandler = (id) => {
    let currentIndex = checkList.indexOf(id);
    let newCheckList = [...checkList];

    if (currentIndex !== -1) {
      // 체크가 되어있다면
      newCheckList.splice(currentIndex, 1);
    } else {
      //체크가 안되어있다면
      newCheckList.push(id);
    }
    setCheckList(newCheckList);
    handleFilters(newCheckList);
  };

  const renderCheckboxLists = () => {
    return (
      list &&
      list.map((item, index) => (
        <>
          <Checkbox
            onChange={() => toggleHandler(item._id)}
            checked={checkList.indexOf(item._id) !== -1 ? true : false}
          />
          <span>{item.name}</span>
        </>
      ))
    );
  };

  return (
    <>
      <Collapse defaultActiveKey={['0']} onChange>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </>
  );
}

export default CheckBox;
