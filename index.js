const express = require("express");
const {Router} = express
const app = express();
const router = Router()
app.use(express.json())
app.use(express.urlencoded({extended:true}))



const productos = [{"tittle": "Monitor" , "price": 50000 , "thumbnail": "www.monitor.com.ar"}, {"tittle": "Teclado" , "price": 10000 , "thumbnail": "www.teclado.com.ar"} , {"tittle": "Joystick" , "price": 15000 , "thumbnail": "www.joystick.com.ar"},{"tittle": "celular", "price": 50000 , "thumbnail": "www.celular.com.ar" }]

for (let i=0; i<productos.length; i++){
    if (i === 0){
        const id = 1
        productos[i].id = id
    }else{
        let ultimoProducto = productos[i-1]
        let idActual = ultimoProducto.id
        id = idActual + 1
        productos[i].id = id
    }
}


router.get('/productos' , async (req , res) =>{
    res.send(productos)
})

router.get('/productos/:id' , async (req , res) => {
    const {id} = req.params // esto es lo mismo que escribir req.params.id

    let productoEncontrado =  productos[id-1]

    if (productoEncontrado) {
        res.send(productoEncontrado)
    } else {
        res.status(404).send({ error: true , msg: "producto no encontrado" })
    }
})

router.post('/productos' ,  (req , res) => {
    const {tittle , price , thumbnail} = req.body
    let ultimoProducto = productos[productos.length - 1 ]
    let id = ultimoProducto.id + 1
    const productoRecibido = {tittle, price , thumbnail, id}
    productos.push(productoRecibido)
    res.send(productoRecibido)
})

router.put('/productos/:id' , async (req , res) => {
    const {id} = req.params // esto es lo mismo que escribir req.params.id
    let productoActualizado = req.body

    const indiceDeProductoActualizar = productos.findIndex (x => x.id == id)

    if (indiceDeProductoActualizar !== -1) {
        
        productos[indiceDeProductoActualizar] = productoActualizado
        res.send()
    } else{
        res.status(404).send({ error: true , msg: "producto no encontrado" })
    }
})
    

router.delete('/productos/:id' , async (req , res) => {
    const {id} = req.params
    const indiceDeProductoABorrar = productos.findIndex (x => x.id == id)

    if (indiceDeProductoABorrar !== -1) {
        productos.splice(indiceDeProductoABorrar , 1)
        res.send("")
    } else{
        res.status(404).send({ error: true , msg: "producto no encontrado" })
    }
})

app.use('/api' , router)

app.listen(8081 , () =>{
    console.log("corriendo");
})

