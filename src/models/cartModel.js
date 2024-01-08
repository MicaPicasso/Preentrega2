import { Schema, model } from "mongoose";


const cartSchema = new Schema({
   title: String,
   products: [
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products', 
            required: true
        },
        quantity: {
            type: Number,
            default: 1 
        }
    }
]
});


const cartModel = model("cart", cartSchema)

export {cartModel};