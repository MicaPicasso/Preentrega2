import express from "express"
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.router.js"
// import chatRouter from "./routes/chat.router.js"
import cartRouter from "./routes/cart.router.js"
import __dirname from "./utils.js"
import { password, PORT, db_name } from "./env.js"
import mongoose from "mongoose"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"


// Socket Server
// import { Server } from "socket.io"

const app=express()



// instancia de websocket
// const socketServer = new Server(httpServer)


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// Configuracion del engine
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "home",
    handlebars: allowInsecurePrototypeAccess(handlebars),
}))
    // seteo del motor
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`)


// Public
app.use(express.static(`${__dirname}/public`))


// Routes
app.use("/api/products" , productsRouter)
// app.use("/chat", chatRouter)
app.use("/api/cart", cartRouter)


// // Socket communication
// const messages=[]

// socketServer.on("connection", (socketClient) => {
//     console.log("Nuevo cliente conectado");
  
//     // recibe el mensaje que enviamos
//     socketClient.on("message", (data) => {
//       // console.log(data);
//       messages.push(data)
//       messageModel.create({messages:data.message, user: data.user})
//       // aca envia los mensajes para los ya conectados a todos
//       socketServer.emit("messages", messages)
//     });
  
//     socketClient.on("inicio", (data)=>{
//       socketServer.emit("messages", messages);
//       socketClient.broadcast.emit("connected", data)
//     })
    
//     // aca lo emite cuando inicia una comunicacion
//     socketClient.emit("messages", messages)
// })  



// Mongoose Conection
        // esto devuelve una promesa 
mongoose.connect(
    `mongodb+srv://micapicasso:${password}@cluster0.boiyenp.mongodb.net/${db_name}?retryWrites=true&w=majority`
)
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log("Hubo un error");
    console.log(err);
})




app.get("/",(req,res)=>{
    res.send("hola")
})


app.listen(PORT, ()=> console.log(`Servidor listo en el puerto 8080`))