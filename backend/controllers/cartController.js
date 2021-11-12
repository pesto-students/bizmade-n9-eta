import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";

// @desc Fetch all cart items
// @route GET /api/cart
// @access Private/Admin
const getCartItems = asyncHandler(async (req, res) => {
  //console.log("endpoint hit");
  // console.log("req params");
  console.log(req.query.email);
  // console.log("endpoint hit");
  const myCart = await Cart.find({ email: req.query.email });
  // console.log(myCart);
  res.json(myCart);
});

// @desc ADD cart item
// @route POST /api/cart/product/:id
// @access Private/Admin
const addToCart = asyncHandler(async (req, res) => {
  const myCart = await Cart.find({ email: req.body.email });
  // console.log(req.body.email);
  // console.log(myCart);

  if (myCart.length) {
    const data = req.body;
    // console.log("myCart.cartItems->");
    // console.log(myCart[0].cartItems);

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
  console.log(req.url);

  const myCart = await Cart.find({ "cartItems._id": req.params.id });

  // if (cartItemById) {
  //   await cartItemById.remove();
  //   res.json({ message: "Cart Item removed" });
  // } else {
  //   res.status(404);
  //   throw new Error("Cart Item found");
  // }
  res.json(myCart);
});

export { getCartItems, addToCart, deleteCartItem };
