import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Wishlist from "../models/wishlistModel.js";
import User from "../models/userModel.js";

// @desc Fetch all wishlist items
// @route GET /api/wishlist
// @access Private/Admin
const getwishlistItems = asyncHandler(async (req, res) => {
  const wishlistItems = await Wishlist.find({});
  res.json(wishlistItems);
});

// @desc ADD wishlist item
// @route POST /api/wishlist/product/:id
// @access Private/Admin
const addToWishlist = asyncHandler(async (req, res) => {
  const myWishList = await Wishlist.find({ email: req.body.email });
  console.log("body", req.body);

  if (myWishList.length) {
    const data = req.body;
    // console.log("myCart.cartItems->");
    // console.log(myCart[0].cartItems);

    myWishList[0].wishListItems.push(req.body.wishListItems[0]);
    const newWishList = await myWishList[0].save();
    res.json(newWishList);
  } else {
    const data = req.body;
    const wishlistItem = new Wishlist(data);

    const wishlistedProduct = await wishlistItem.save();
    res.json(wishlistedProduct);
  }
});

// @desc    Delete a wishlist item
// @route   DELETE /api/wishlists/:id
// @access  Private/Admin
const deleteWishlistItem = asyncHandler(async (req, res) => {
  const wishlistItem = await Wishlist.findById(req.params.id);

  if (wishlistItem) {
    await wishlistItem.remove();
    res.json({ message: "Wishlist Item removed" });
  } else {
    res.status(404);
    throw new Error("Wishlist Item not found");
  }
});

export { getwishlistItems, addToWishlist, deleteWishlistItem };
