import express from 'express';
import Contenedor from './contenedor.js';

const app= express();
const classContainer = new Contenedor('productos');

const producto1 = {
    name:"pc gamer",
    price:105000,
    image:"ruta/imagen/pcgamer/tiendagamer.pnj",
}
const producto2 ={
    name:"teclado NOGA 2.0",
    price:5200,
    image:"ruta/imagen/tecladogamernoga/tiendagamer.pnj"
}
const producto3 ={
    name:"auriculares sony 2800 hzd",
    price:23000,
    image:"ruta/imagen/auricularesgamer/tiendagamer.pnj"
}
const producto4 ={
    name:"monitor samsung 32 pulgadas,",
    price:65999,
    image:"ruta/imagen/monitorsamsung/tiendagamer.pnj"
}

const agregarProductos = async()=>{
    const arreglo = true;
    if (arreglo) {
        await classContainer.save(producto1);
        await classContainer.save(producto2);
        await classContainer.save(producto3);
        await classContainer.save(producto4);
    
    }
}


const server = app.listen(8080,()=>{
    console.log('listening on express :)');
})

app.get('/',(req,res)=>{
    res.send('ingrese un id por URL para ver un items o escriba /productos para ver todos')
})

//este codigo te trae todos los productos del json y los muestra.
app.get('/productos',async(req,res)=>{
    const arrayDatos = await classContainer.getAll();
    res.send({products:arrayDatos})
})

// este codigo lee el archivo JSON y lo compara con el ID que me envian por url.
// si el archivo existe el servidor le devuelve el producto,sino le dice que no existe producto con el ID solicitado
app.get('/productos/:id',async(req,res)=>{
    try {
        if (fs.existsSync(ruta)) {
            const datos = await fs.promises.readFile(ruta,'utf-8');
            const productos = JSON.parse(datos);
            const peticionId = req.params.id;

            if (!isNaN(peticionId)) {
                if (peticionId<=productos.length) {
                    const item =productos.find(prod=>prod.id === parseInt(peticionId));
                    res.send({objeto:item})
                } else {
                    res.send(`<h1 style="color:red">no existe un producto con el id: ${peticionId}<h1>`)
                }
            } else {
                res.send('el parametro ingresado no corresponde a un numero,ingrese de nuevo')
            }
        } else {
            res.send(404)
        }
    } catch (error) {
        console.log(error);
    }
})

// try {
//     if (fs.existsSync(ruta)) {
//         const datos =await fs.promises.readFile(ruta,'utf-8');
//         const productos = JSON.parse(datos);
//         res.send({data:productos})
//     } else {
//         res.send(404)
//     }
// } catch (error) {
//     console.log(error);
// }