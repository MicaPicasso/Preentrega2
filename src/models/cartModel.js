import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartSchema = new Schema({
   title: String,
   products: [
    {
        product: [{
            type: Schema.Types.ObjectId,
            ref: 'products', 
            required: true
        }],
            quantity: {
            type: Number,
        }
    }
]
});

cartSchema.plugin(mongoosePaginate)


const cartModel = model("cart", cartSchema)

export {cartModel};