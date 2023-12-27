import { Schema, model } from "mongoose";


const cartSchema = new Schema({
   title: String,
   products: [
    {
        type: Schema.Types.ObjectId,
        ref: 'products'
    }
   ]
});


const cartModel = model("cart", cartSchema)

export {cartModel};