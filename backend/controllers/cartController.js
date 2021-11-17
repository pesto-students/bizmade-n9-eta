import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";

// @desc Fetch all cart items
// @route GET /api/cart
// @access Private/Admin
const getCartItems = asyncHandler(async (req, res) => {
  console.log(req.query.email);
  // console.log(req.body.email);
  const myCart = await Cart.find({ email: req.query.email });
  myCart.length === 0 ? res.json([{ cartItems: [] }]) : res.json(myCart);
});

// @desc ADD cart item
// @route POST /api/cart/product/:id
// @access Private/Admin
const addToCart = asyncHandler(async (req, res) => {
  const myCart = await Cart.find({ email: req.body.email });
  console.log(req.body.email);
  // console.log(myCart);
  console.log("request ");
  console.log(req.body);
  if (myCart.length) {
    const data = req.body;
    console.log("myCart.cartItems->");
    console.log(myCart[0].cartItems);

    myCart[0].cartItems.push(req.body.cartItems[0]);
    const newCart = await myCart[0].save();
    res.json(newCart);
  } else {
    const data = req.body;
    const cartItem = new Cart(data);
    // console.log("data", data);
    // console.log("cartItem", cartItem);

    const cartAddedItem = await cartItem.save();
    res.json(cartAddedItem);
  }
});

// @desc    Delete a cart item
// @route   DELETE /api/cart/:id
// @access  Private/Admin
const deleteCartItem = asyncHandler(async (req, res) => {
  console.log("delete end point hit");
  // console.log(req);
  const myCart = await Cart.find({ email: req.query.email });
  console.log("my cart is ");
  console.log(myCart);
  let cartLength = myCart[0].cartItems.length;
  let cartItems = myCart[0].cartItems;
  let index = -1;
  console.log(cartLength);
  for (let i = 0; i < cartLength; i++) {
    if (cartItems[i]._id == req.params.id) {
      index = i;
    }
  }
  console.log(index);
  if (index != -1) {
    myCart[0].cartItems.splice(index, 1);
    const newCart = await myCart[0].save();
    res.json({ message: "Cart Item removed" });
  } else {
    res.status(404);
    throw new Error("Cart Item not found");
  }
});

export { getCartItems, addToCart, deleteCartItem };
