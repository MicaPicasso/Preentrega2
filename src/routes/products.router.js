import { Router } from "express";
import productDao from "../dao/db_manager/products.dao.js"

const router= Router()



// add
    // traer todos los productos

    router.get("/", async(req,res)=>{
        try{
            const products= await productDao.getAllProducts()
            const limit= req.query.limit
            if(limit){
                res.json(products.slice(0,limit))
            }else{
                res.json(products)

            }    
        }catch(error){
            console.log(error);

            res.json({
                message: "error",
                error
            })
        }
    })

    // traer producto por id
    router.get("/:id", async(req,res)=>{
        try{
            const {id}= req.params
            const products= await productDao.getProductById({_id:id})
            res.json({product: products}) 
        }catch(error){
            console.log(error);

            res.json({
                message: "error",
                error
            })
        }
    })


    // agregar un producto a la bd
    router.post("/", async(req,res)=>{
        try{
            const {title,description,code,price, stock, category, thumbnails}= req.body
            
            const product= {
                title: title,
                description: description,
                code: code,
                price: Number(price),
                status: true,
                stock: Number(stock),
                category: category,
                thumbnails: thumbnails
            }
            
            const response= await productDao.createProduct(product)

            res.json({"producto agregado": response})
         }catch(error){
            console.log(error);

            res.json({
                message: "error",
                error
            })
        }
    })
        
       
    // editar un producto segun su id  
    router.put("/:id", async (req,res)=>{
        try{
            const { id }= req.params;
            const product= req.body
            console.log(product);
            const response= await productDao.updateProduct({_id: id}, product)
            if(!response){
                return res.json({ 
                    message: "Product not found"
                })
            }else{
                res.json({
                    "Producto Actualizado": response
                })
            }
        }catch(error){
            console.log(error);

            res.json({
                message: "error",
                error
            })
        }
    })


    router.delete("/:id", async(req,res)=>{
        try{
            const {id}= req.params;
            const response= await productDao.deleteProduct({_id: id});

            if(!response) return res.json({error: "Product not found"})

            res.json({message: "Producto eliminado"})
            
        }catch(error){
            console.log(error);

            res.json({
                message: "error",
                error
            })
        }
    })





export default router