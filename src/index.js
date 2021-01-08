import app from "./app";
import "@babel/polyfill";
import { sequelize } from './BaseDeDatos/database'

async function main() {
    const port = 4000
    await app.listen(port);
    console.log('Server on port ',port);
    try {
        await sequelize.sync({ force: false }).then(() => {
            console.log("Base de datos conectada");
        }).catch(error => {
            console.log('Se ha producido un error', error);
        })        
    } catch (error) {
        console.log({"Error":error})
    }
}

main();