import { Router } from "express";
import cartDao from "../dao/db_manager/cart.dao.js";
import ProductDao from "../dao/db_manager/products.dao.js";

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

// recibe los productos
// router.get("/:cid", (req,res)=>{
//     const {cid}= req.params
//     cartManager.getProductsByCartId(Number(cid))
//     const index= cartManager.carts.findIndex((el)=> el.id === Number(cid))
//     if(index=== -1){
//         res.json({status: "el carrito solicitado no existe"})
//     }
//     const response= cartManager.carts[index].products
//     res.json({carrito: Number(cid), products: response})

// })

// agregar productos
router.post("/:cid/products/:pid", async (req,res)=>{
    try{
        const {pid,cid}=req.params
        
        const cart = await cartDao.getCartById({_id:cid})
        
         // a veces hace el populate a veces no
        cart.populate('products')  
        
        cart.products.push(pid)
        
        const response = await cartDao.updateCart({_id: cart._id}, cart)
        
        console.log(cart);
        res.json(response)
       
        // const product = await ProductDao.getProductById(pid);

        // let productFound = false;

        // cart.products.forEach(() => {
        //     // if (cart.products._id === pid) {
        //     //     // Si el producto ya está en el carrito, incrementa la cantidad
        //     //     cart.products.quantity += 1;
        //     //     productFound = true;
        //     // }
        //     console.log(cart.products.products);
        // });
        
        // // Si el producto no está en el carrito, agrégalo con una cantidad de 1
        // if (!productFound) {
        //     cart.products.push({
        //         _id: product._id,
        //         quantity: 1
        //     });
        // }
        // // para agregar quantity
        // cart.products.forEach((pid)=>{
            
        //     if(id){
        //         quantity = quantity + 1
        //     }else{
        //         quantity = 0
        //     }
        // });

        // res.json({"Carrito Creado": response})
     }catch(error){
        console.log(error);

        res.json({
            message: "error",
            error
        })
    }
})

// metodo delete
// debe eliminar del carrito el producto seleccionado

// metodo delete2
// debe eliminar stodos los productos
// tampoco debe eliminar el carrito, solo vaciarlo

// put
// debe permitir actualizar el carrito
// debe recibir com body todo el arreglo de productos que queremos actualizar
// recibe un array completos con todos los neuvos id y las cantidades nuevas

// put2
// el body que voy a enviar debe ser el producto como tal. actualizar solo la cantidad de ejemplares de ese producto por la cantidad que yo paso por 
// debe poder actualizar la cantidad que corresponde a dicho producto


// prodcuts antes solo era con id de productos
// como nuestro producto tiene id de mongo, ahora tengo que hacer una population a dichos productos.
// osea que si yo mando a llamar el end point de carts, al momento de traer el cqarrito, debe poder trar los prodcutos desglosados.





export default router