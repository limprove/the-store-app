import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const options = [
  { value: 1, title: 'Europe' },
  { value: 2, title: 'Africa' },
  { value: 3, title: 'Asia' },
  { value: 4, title: 'North America' },
  { value: 5, title: 'South America' },
  { value: 6, title: 'Australia' },
  { value: 7, title: 'Antarctica' },
];

function UploadProductPage({ user, history }) {
  const [ProductName, setProductName] = useState('');
  const [ProductDescription, setProductDescription] = useState('');
  const [ProductPrice, setProductPrice] = useState(0);
  const [ProductOptions, setProductOptions] = useState(0);
  const [ProductImages, setProductImages] = useState([]);

  const titleChangeHandler = (e) => {
    setProductName(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setProductDescription(e.target.value);
  };

  const priceChangeHandler = (e) => {
    setProductPrice(e.target.value);
  };

  const optionChangeHandler = (e) => {
    setProductOptions(e.target.value);
  };

  const updateImages = (newImages) => {
    setProductImages(newImages);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !ProductName ||
      !ProductDescription ||
      !ProductPrice ||
      !ProductOptions ||
      !ProductImages
    ) {
      return alert('모든 값을 넣어야 합니다.');
    }
    let body = {
      writer: user.userData._id,
      title: ProductName,
      description: ProductDescription,
      price: ProductPrice,
      continents: ProductOptions,
      images: ProductImages,
    };
    axios.post('/api/product', body).then((res) => {
      if (res.data.success) {
        alert('상품 업로드에 성공했습니다.');
        history.push('/');
      } else {
        alert('데이터 저장에 실패했습니다.');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>
      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={ProductName} />
        <br />
        <br />
        <label>설명</label>
        <TextArea
          onChange={descriptionChangeHandler}
          value={ProductDescription}
        />
        <br />
        <br />
        <label>가격($)</label>
        <Input
          onChange={priceChangeHandler}
          value={ProductPrice}
          type="number"
        />
        <br />
        <br />
        <select onChange={optionChangeHandler} value={ProductOptions}>
          {options.map((opt, ind) => (
            <option key={opt.value} value={opt.value}>
              {opt.title}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="submit" onClick={submitHandler}>
          확인
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
