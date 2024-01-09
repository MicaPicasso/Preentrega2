import { Router } from "express";
import cartDao from "../dao/db_manager/cart.dao.js";
import { cartModel } from "../models/cartModel.js";


const router= Router()



// crearlo
router.post("/", async(req,res)=>{
    try{
        const cart={
            title: "Carrito"
        }
        
        const response= await cartDao.createCart(cart)

        res.json({"Carrito Creado": response})
     }catch(error){
        console.log(error);

        res.json({
            message: "error",
            error
        })
    }
})

router.post("/:cid/products/:pid", async (req, res) => {
    try {
        const { pid, cid } = req.params;

        // Obtener el carrito con detalles de productos poblados
        const cart = await cartModel.findById({_id: cid}).populate('products');
  
        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.products.findIndex(product => product._id === pid);
        console.log(existingProductIndex);
        console.log(cart.products);
        if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        cart.products[existingProductIndex].quantity += 1;
        } else {
        // Si el producto no está en el carrito, agrégalo con una cantidad de 1
        cart.products.push({
         _id: pid,
         quantity: 1
        });
        }

        // Actualizar el carrito en la base de datos
        const response = await cartDao.updateCart({ _id: cart._id }, cart);

        // console.log(cart);
        res.json(response);
        } catch (error) {
        console.log(error);

        res.json({
            message: "error",
            error
        });
        }
        });




// metodo delete
// debe eliminar del carrito el producto seleccionado

router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const { pid, cid } = req.params;

        // Obtener el carrito con detalles de productos poblados
        const cart = await cartModel.find({ _id: cid }).populate('products');

        // Encontrar el índice del producto en el carrito
        const productIndex = cart.products.findIndex(product => product._id === pid);

        if (productIndex !== -1) {
            // Si el producto está en el carrito, eliminarlo
            cart.products.splice(productIndex, 1);

            // Actualizar el carrito en la base de datos
            const response = await cartDao.updateCart({ _id: cart._id }, cart);

            res.json(response);
        } else {
            res.json({ message: "El producto no esta en el carrito" });
        }
    } catch (error) {
        console.log(error);

        res.json({
            message: "error",
            error
        });
    }
});




// metodo delete2
// debe eliminar stodos los productos
// tampoco debe eliminar el carrito, solo vaciarlo

router.delete("/:cid", async (req, res) => {
    try {
        const {cid} = req.params;

        const carritoVacio = {
            title: "Carrito Vacio", 
            products: [] 
        };

        // Actualizar el carrito en la base de datos
        const response = await cartDao.updateCart({ _id: cid}, carritoVacio);

        res.json(response);
        
    } catch (error) {
        console.log(error);

        res.json({
            message: "error",
            error
        });
    }
});



// put
// debe permitir actualizar el carrito
// debe recibir com body todo el arreglo de productos que queremos actualizar
// recibe un array completos con todos los neuvos id y las cantidades nuevas

router.put("/:cid", async (req, res) => {
    try {
        const {cid} = req.params;
        const {pid, quantity}= req.body

        const products={
            title: 'Producto Modificado',
            products: {pid,
            quantity
            }
        }      
        
        const response = await cartDao.updateCart({ _id: cid}, products);

        res.json(response);
        
    } catch (error) {
        console.log(error);

        res.json({
            message: "error",
            error
        });
    }
});

router.get("/", async (req,res)=>{
    res.render("home")
})


router.get("/paginate", async (req,res)=>{
    const cart = await cartModel.paginate()
    console.log(cart);

    res.render("cart",{
        cart
    })
})





export default router