import express from 'express';
import Contenedor from './contenedor.js';

const app= express();
const classContainer = new Contenedor('productos');


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
app.get('/:id',async(req,res)=>{
    try {
        const peticionId = req.params.id;
        const objetoEncontrado = await classContainer.getById(peticionId);
        if (!(null==objetoEncontrado)) {
            res.send(objetoEncontrado)
        }else if(!isNaN(peticionId)){
            res.send('no existe un producto con el ID ingresado,por favor ingrese otro')
        }
        else {
            res.send('el ID ingresado no corresponde a un numero,ingrese de nuevo')
        }
    } catch (error) {
        console.log(error);
    }
})