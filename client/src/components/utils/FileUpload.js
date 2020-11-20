import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload({ refreshFunction }) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    let config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/product/image', formData, config).then((res) => {
      if (res.data.success) {
        setImages([...Images, res.data.filePath]);
        refreshFunction([...Images, res.data.filePath]);
      } else {
        alert('파일 저장에 실패하였습니다.');
      }
    });
  };

  const deleteHandler = (img) => {
    const currentIndex = Images.indexOf(img);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    refreshFunction(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {Images.map((img, ind) => (
          <div key={ind} onClick={() => deleteHandler(img)}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${img}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
