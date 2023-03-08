const express = require('express');
const router = express.Router();
const products = [
  { id: 1, name: 'Susu Beruang', description: 'Susu Beruang tapi bukan dari Beruang ekekekk', price: 10000 },
  { id: 2, name: 'Roti Cokelat Keju', description: 'Roti rasa cokelat dan rasa keju jadi satu', price: 12500 },
  { id: 3, name: 'Jagung Bakar', description: 'Jagung dibakar bukan digoreng', price: 29000 }
];

// READ ALL PRODUCTS
router.get('/', (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let result = products;
  if (minPrice && maxPrice) {
    result = products.filter(p => p.price >= +minPrice && p.price <= +maxPrice);
  }
  res.send(result);
});

// READ PRODUCT BY ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    res.status(404).json({ message: 'Produk tidak ditemukan' });
  } else {
    res.json(product);
  }
});

// ADD MULTIPLE PRODUCTS
router.post('/:segment', (req, res) => {
  const segment = req.params.segment;
  if (segment !== 'add') {
    res.status(400).json({ message: 'Segment parameter harus bernama "add"' });
    return;
  }
  const newProducts = req.body;
  if (!Array.isArray(newProducts)) {
    res.status(400).json({ message: 'Data produk yang dikirimkan harus berupa array' });
    return;
  }
  products = [...products, ...newProducts];
  res.json({ message: 'Data produk berhasil ditambahkan' });
});

// CREATE
router.post('/', (req, res) => {
  const {name, description, price} = req.body;
  const newProduct = {id: 4, name, description, price};
  res.json(newProduct);
});
// UPDATE
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const {name, description, price} = req.body;
  const updatedProduct = {id, name, description, price};
  res.json(updatedProduct);
});
// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json({message: `Produk dengan ${id} telah terhapus.`});
});
module.exports = router;
