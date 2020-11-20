import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage({ detail }) {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (detail.images && detail.images.length > 0) {
      let images = [];

      detail.images.map((image, index) => {
        images.push({
          original: `http://localhost:5000/${image}`,
          thumbnail: `http://localhost:5000/${image}`,
        });
      });
      setImages(images);
    }
  }, [detail]);
  return <ImageGallery items={Images} />;
}

export default ProductImage;
