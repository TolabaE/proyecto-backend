import fs from 'fs';

const ruta ='./src/productos.json';//guardo la ruta del archivo en una constante.

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
            } else {
                objeto.id = 1;
            }
            arrayproductos.push(objeto);
            await fs.promises.writeFile(ruta,JSON.stringify(arrayproductos,null,2))
        } catch (error) {
            console.log(error);
        }
    }
    //este codigo nos trae todos los productos que hay en el JSON.
    getAll=async()=>{
        try {
            const data = await fs.promises.readFile(ruta,'utf-8');
            return  JSON.parse(data);
        } catch (error) {
            console.log('error de lectura'+ error);
        }
    }
    //este codigo nos devuelve un producto de acuerdo al ID que nos pasaron
    getById=async(numeroId)=>{
        try {
            const leerDatos = await fs.promises.readFile(ruta,'utf-8');
            let arrayCompras=JSON.parse(leerDatos);
            if (arrayCompras.some(prod=>prod.id==numeroId)) {
                return arrayCompras.find(prod=>prod.id===parseInt(numeroId));
            }else{
                return (null);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Contenedor;