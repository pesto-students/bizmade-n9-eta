import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 7;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            manufacturer: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .populate("category")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch all products
// @route GET /api/products/manufacturer/:manufacturer
// @access Private
const getManufacturerProducts = asyncHandler(async (req, res) => {
  const manufacturer = req.params.id;
  const products = await Product.find({ manufacturer });

  res.json({ products });
});

// @desc Fetch product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
    // throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    price,
    description,
    image,
    manufacturer,
    category,
    countInStock,
    minQuantity,
    maxQuantity,
  } = req.body;
  const product = new Product({
    user,
    name,
    image,
    manufacturer,
    category,
    description,
    price,
    countInStock,
    minQuantity,
    maxQuantity,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    manufacturer,
    category,
    countInStock,
    minQuantity,
    maxQuantity,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.manufacturer = manufacturer;
    product.category = category;
    product.countInStock = countInStock;
    product.minQuantity = minQuantity;
    product.maxQuantity = maxQuantity;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
    // throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
    // throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(3);

  res.json(products);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getAllProducts,
  getManufacturerProducts,
};
