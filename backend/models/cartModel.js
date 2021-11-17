import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: "Product",
        },
        name: { type: String },
        qty: { type: Number },
        image: { type: String },
        minQuantity: { type: Number },
        maxQuantity: { type: Number },
        price: { type: Number },
        countInStock: { type: Number },
        manufacturer: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
