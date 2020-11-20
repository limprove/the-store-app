const express = require('express');
const multer = require('multer');
const { Product } = require('../models/Product');

const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
  // 가져온 이미지를 저장
  upload(req, res, (err) => {
    if (err)
      return res.status(400).json({
        success: false,
        err,
      });
    return res.status(200).json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post('/', (req, res) => {
  // 받아온 정보를 DB에 저장
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post('/products', (req, res) => {
  // product collection에 들어있는 모든 상품 정보 가져오기
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let term = req.body.searchTerm;

  let findArg = {};
  for (key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArg[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArg[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    Product.find(findArg)
      .find({ $text: { $search: term } })
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          length: productInfo.length,
        });
      });
  } else {
    Product.find(findArg)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          length: productInfo.length,
        });
      });
  }
});

router.get('/products_by_id', (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  console.log('req.query.id', req.query.id);

  if (type === 'array') {
    let ids = req.query.id.split(',');
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }

  console.log('productIds', productIds);

  //we need to find the product information that belong to product Id
  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err)
        return res.status(400).json({
          success: false,
          err,
        });
      return res.status(200).send(product);
    });
});

module.exports = router;
