import { Schema, model } from "mongoose";


const productSchema = new Schema({
    // propiedades del modelo, asi se va a mostrar en la base de datos
    title: {
        type: String,
        required:true
    },
    description: String,
    code: {
        type: String,
        unique:true
    },
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: String,
});

// este modelo es lo que usamos para comunicarnos con la base de datos "products se va a llamar la coleccion" Si no esta la coleccion, mongoose te la crea
const productModel = model("products", productSchema)

export {productModel};