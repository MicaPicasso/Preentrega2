// const socketClient=io()

// const chatbox= document.querySelector("#chatbox")
// let user;


// Swal.fire({
//     title: "Bienvenido",
//     text: "Ingrese su nombre para continuar",
//     icon: "info",
//     input: "text",
//     // para que si o si se ingrese un campo
//     inputValidator: (value)=>{
//       return !value && "Necesitás identificarte"
//     },
//     // para evitar apretar fuera del campo
//     allowOutsideClick: false
//   })
//   // es el valor que me devuelve la entrada 
//   .then((value)=>{
//     console.log(value);
//     // va guardando los valores en user.
//     user = value.value
//     console.log(user);
//     socketClient.emit("inicio", user);
//   })
  
  
//   // para capturar el mensaje
//   chatbox.addEventListener("keyup", (e)=>{
//     if(e.key === "Enter"){
//       // lo envio por websocket al servidor
//       socketClient.emit("message", {
//         user,
//         message: e.target.value
//       })
//       chatbox.value=""
//     }
//   })
  
//   socketClient.on("messages", (data)=>{
//     console.log(data);
//   })
  
//   socketClient.on("messages", (data)=>{
//     const log= document.querySelector("#messages")
//     let messages= ""
//     data.forEach(message => {
//       messages += `<strong>${message.user}</strong>: ${message.message} <br/>`
//     });
//     log.innerHTML= messages
//     console.log(data);
  
//   })
  
//   socketClient.on("connected", (data)=>{
//     if(user !== undefined){
//       Swal.fire({
//         text: `Nuevo usuario conectado: ${data}`,
//         toast: true,
//         position: "top-right",
//       })
//     }
//   })