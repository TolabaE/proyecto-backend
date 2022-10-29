import fs from 'fs';

const ruta ='./src/productos.json';//guardo la ruta del archivo en una constante.

class Contenedor{
    constructor(nombre){
        this.nombre=nombre;
    }
    //este codigo nos permite guardar productos en un archivo JSON,asignando un ID.
    save=async(objeto)=>{

        let arrayproductos=[];
        try {
            if (fs.existsSync(ruta)) {
                const datos = await fs.promises.readFile(ruta,'utf-8');
                arrayproductos = JSON.parse(datos);
                const id =arrayproductos.length +1;
                objeto.id = id;
                arrayproductos.push(objeto);
                await fs.promises.writeFile(ruta,JSON.stringify(arrayproductos,null,2))
            } else {
                objeto.id = 1;
                arrayproductos.push(objeto)
                await fs.promises.writeFile(ruta,JSON.stringify(arrayproductos,null,2));
            }
        } catch (error) {
            console.log(error);
        }
    }
    //este codigo nos trae todos los productos que hay en el JSON.
    getAll=async()=>{

        let arrayproductos=[];//creo un array vacio.
        try {
            const data = await fs.promises.readFile(ruta,'utf-8');
            arrayproductos = JSON.parse(data);
            return arrayproductos;
        } catch (error) {
            console.log('error de lectura'+ error);
        }
    }
    //este codigo nos devuelve un producto de acuerdo al ID que nos pasaron
    getById=async(numeroId)=>{
        try {
            const leerDatos = await fs.promises.readFile(ruta,'utf-8');
            let arrayCompras=JSON.parse(leerDatos);
            if (arrayCompras.length>=numeroId) {
                const itemEncontrado = arrayCompras.find(prod=>prod.id==numeroId);
                console.log(itemEncontrado);
            }else{
                console.log("no tiene un producto con ese ID asignado");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Contenedor;